import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import crypto from 'node:crypto';

// Turso Cloud SQLite Configuration (set in Vercel environment variables)
const TURSO_URL = process.env.TURSO_DATABASE_URL;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;

// Local fallback SQLite
const DB_DIR = process.env.VERCEL ? os.tmpdir() : path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'pensa.db');

let _localDb: DatabaseSync | null = null;
let _schemaInitialized = false;

function getLocalDb(): DatabaseSync {
  if (_localDb) return _localDb;

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  _localDb = new DatabaseSync(DB_PATH);
  _localDb.exec('PRAGMA foreign_keys = ON;');
  return _localDb;
}

// Convert arbitrary JS values into Turso HTTP pipeline format
function toTursoArg(val: any): { type: string; value?: string } {
  if (val === null || val === undefined) {
    return { type: 'null' };
  }
  if (typeof val === 'number') {
    if (Number.isInteger(val)) {
      return { type: 'integer', value: String(val) };
    }
    return { type: 'float', value: String(val) };
  }
  if (typeof val === 'bigint') {
    return { type: 'integer', value: String(val) };
  }
  if (typeof val === 'boolean') {
    return { type: 'integer', value: val ? '1' : '0' };
  }
  return { type: 'text', value: String(val) };
}

// Parse Turso row response into JS object
function parseTursoRow(cols: { name: string }[], row: any[]): Record<string, any> {
  const obj: Record<string, any> = {};
  for (let i = 0; i < cols.length; i++) {
    const colName = cols[i].name;
    const cell = row[i];
    if (!cell || cell.type === 'null') {
      obj[colName] = null;
    } else if (cell.type === 'integer') {
      obj[colName] = Number(cell.value);
    } else if (cell.type === 'float') {
      obj[colName] = Number(cell.value);
    } else {
      obj[colName] = cell.value;
    }
  }
  return obj;
}

// Execute query against Turso Cloud via HTTP Pipeline
async function executeTurso(sql: string, params: any[] = []): Promise<{ rows: any[]; changes: number }> {
  if (!TURSO_URL || !TURSO_TOKEN) {
    throw new Error('Turso credentials missing');
  }

  const host = TURSO_URL.replace(/^libsql:\/\//, 'https://').replace(/^http:\/\//, 'https://').replace(/\/$/, '');
  const endpoint = host.endsWith('/v2/pipeline') ? host : `${host}/v2/pipeline`;

  const body = {
    requests: [
      {
        type: 'execute',
        stmt: {
          sql,
          args: params.map(toTursoArg),
        },
      },
      { type: 'close' },
    ],
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Turso HTTP Error (${res.status}): ${errText}`);
  }

  const json = await res.json();
  const firstResult = json.results?.[0];

  if (!firstResult || firstResult.type === 'error') {
    throw new Error(`Turso query error: ${firstResult?.error?.message || 'Unknown error'}`);
  }

  const resultData = firstResult.response?.result;
  if (!resultData) {
    return { rows: [], changes: 0 };
  }

  const cols = resultData.cols || [];
  const rows = (resultData.rows || []).map((row: any[]) => parseTursoRow(cols, row));
  const changes = resultData.affected_row_count || 0;

  return { rows, changes };
}

// Check if we are using Turso
export function isUsingTurso(): boolean {
  return Boolean(TURSO_URL && TURSO_TOKEN);
}

// Unified Database API
export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  await ensureInitialized();

  if (isUsingTurso()) {
    const res = await executeTurso(sql, params);
    return res.rows as T[];
  }

  const db = getLocalDb();
  const stmt = db.prepare(sql);
  return stmt.all(...params) as T[];
}

export async function get<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
  const rows = await query<T>(sql, params);
  return rows[0];
}

export async function run(sql: string, params: any[] = []): Promise<{ changes: number }> {
  await ensureInitialized();

  if (isUsingTurso()) {
    const res = await executeTurso(sql, params);
    return { changes: res.changes };
  }

  const db = getLocalDb();
  const stmt = db.prepare(sql);
  const info = stmt.run(...params);
  return { changes: info.changes };
}

export async function exec(sql: string): Promise<void> {
  if (isUsingTurso()) {
    await executeTurso(sql);
    return;
  }
  const db = getLocalDb();
  db.exec(sql);
}

// Ensure database tables exist
export async function ensureInitialized(): Promise<void> {
  if (_schemaInitialized) return;

  const createTablesSql = `
    CREATE TABLE IF NOT EXISTS family_units (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      leader_name TEXT NOT NULL,
      leader_phone TEXT NOT NULL,
      meeting_info TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS members (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      dob TEXT NOT NULL,
      programme TEXT NOT NULL,
      year_level TEXT NOT NULL,
      hostel TEXT NOT NULL,
      membership_status TEXT NOT NULL,
      home_location TEXT NOT NULL,
      department TEXT NOT NULL,
      family_unit_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (family_unit_id) REFERENCES family_units(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS executives (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `;

  if (isUsingTurso()) {
    // Split statements for Turso
    const statements = [
      `CREATE TABLE IF NOT EXISTS family_units (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        leader_name TEXT NOT NULL,
        leader_phone TEXT NOT NULL,
        meeting_info TEXT,
        created_at TEXT NOT NULL
      );`,
      `CREATE TABLE IF NOT EXISTS members (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        dob TEXT NOT NULL,
        programme TEXT NOT NULL,
        year_level TEXT NOT NULL,
        hostel TEXT NOT NULL,
        membership_status TEXT NOT NULL,
        home_location TEXT NOT NULL,
        department TEXT NOT NULL,
        family_unit_id TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (family_unit_id) REFERENCES family_units(id) ON DELETE SET NULL
      );`,
      `CREATE TABLE IF NOT EXISTS executives (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT NOT NULL
      );`,
    ];

    for (const stmt of statements) {
      await executeTurso(stmt);
    }
  } else {
    const db = getLocalDb();
    db.exec(createTablesSql);
  }

  await seedInitialData();
  _schemaInitialized = true;
}

// Seed initial admin if database is empty & purge any fake legacy sample data
async function seedInitialData(): Promise<void> {
  // Purge any fake seeded sample members from previous iterations
  try {
    await run("DELETE FROM members WHERE id LIKE 'mem_%'");
    await run("UPDATE family_units SET leader_name = 'PENSA Secretariat', leader_phone = '' WHERE leader_phone LIKE '+233%'");
  } catch {
    // ignore if tables not yet populated
  }

  // Salted hash for default admin password: pensa2026!
  // Salt: e9a34bc81f729d30, scrypt derived hash
  const defaultSalt = 'e9a34bc81f729d30';
  const defaultHash = crypto.scryptSync('pensa2026!', defaultSalt, 64).toString('hex');
  const storedPassword = `${defaultSalt}:${defaultHash}`;

  await run(
    `INSERT OR IGNORE INTO executives (id, name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    ['exec_admin', 'PENSA Secretariat', 'admin@pensa-umat.org', storedPassword, 'Administrator', new Date().toISOString()]
  );

  const fu1 = 'fu_kt_hall';
  const fu2 = 'fu_chamber_gold';
  const fu3 = 'fu_off_campus';

  await run(
    `INSERT OR IGNORE INTO family_units (id, name, leader_name, leader_phone, meeting_info, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [fu1, 'KT Hall Family Unit', 'PENSA Secretariat', '', 'Sundays 4:30 PM @ KT Hall Common Room', new Date().toISOString()]
  );
  await run(
    `INSERT OR IGNORE INTO family_units (id, name, leader_name, leader_phone, meeting_info, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [fu2, 'Chamber & Gold Refinery Cell', 'PENSA Secretariat', '', 'Sundays 5:00 PM @ Chamber Forecourt', new Date().toISOString()]
  );
  await run(
    `INSERT OR IGNORE INTO family_units (id, name, leader_name, leader_phone, meeting_info, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [fu3, 'Tarkwa Banso & Off-Campus Cell', 'PENSA Secretariat', '', 'Sundays 4:00 PM @ Grace Hostel Lounge', new Date().toISOString()]
  );
}
