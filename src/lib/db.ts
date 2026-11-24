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

// Seed initial admin & sample data if database is empty
async function seedInitialData(): Promise<void> {
  const memberCount = await get<{ count: number }>('SELECT COUNT(*) as count FROM members');
  if (memberCount && memberCount.count > 0) {
    return;
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
    [fu1, 'KT Hall Family Unit', 'Eld. Emmanuel Ofori', '+233541234567', 'Sundays 4:30 PM @ KT Hall Common Room', new Date().toISOString()]
  );
  await run(
    `INSERT OR IGNORE INTO family_units (id, name, leader_name, leader_phone, meeting_info, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [fu2, 'Chamber & Gold Refinery Cell', 'Dcn. Samuel Mensah', '+233249876543', 'Sundays 5:00 PM @ Chamber Forecourt', new Date().toISOString()]
  );
  await run(
    `INSERT OR IGNORE INTO family_units (id, name, leader_name, leader_phone, meeting_info, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [fu3, 'Tarkwa Banso & Off-Campus Cell', 'Sis. Priscilla Addo', '+233501122334', 'Sundays 4:00 PM @ Grace Hostel Lounge', new Date().toISOString()]
  );

  const now = new Date().toISOString();
  const sampleMembers = [
    {
      id: 'mem_1',
      full_name: 'Kwadwo Asare Boateng',
      phone: '+233244112233',
      email: 'kboateng@st.umat.edu.gh',
      dob: '2003-04-12',
      programme: 'BSc Computer Science and Engineering',
      year_level: 'Level 300',
      hostel: 'KT Hall',
      membership_status: 'Pentecost Member',
      home_location: 'Kumasi, Ashanti Region',
      department: 'Media',
      family_unit_id: fu1,
    },
    {
      id: 'mem_2',
      full_name: 'Abena Serwaa Prempeh',
      phone: '+233502233445',
      email: 'asprempeh@st.umat.edu.gh',
      dob: '2004-09-25',
      programme: 'BSc Mining Engineering',
      year_level: 'Level 200',
      hostel: 'Gold Refinery Hall',
      membership_status: 'Pentecost Member',
      home_location: 'Sunyani, Bono Region',
      department: 'Choir',
      family_unit_id: fu2,
    },
    {
      id: 'mem_3',
      full_name: 'David Selorm Agbenyega',
      phone: '+233241987650',
      email: 'dsagbenyega@st.umat.edu.gh',
      dob: '2002-11-18',
      programme: 'BSc Electrical and Electronic Engineering',
      year_level: 'Level 400',
      hostel: 'Chamber of Mines Hall',
      membership_status: 'Pentecost Member',
      home_location: 'Ho, Volta Region',
      department: 'Organizing',
      family_unit_id: fu2,
    },
    {
      id: 'mem_4',
      full_name: 'Mercy Esi Mensah',
      phone: '+233273344556',
      email: 'memensah@st.umat.edu.gh',
      dob: '2005-02-14',
      programme: 'BSc Petroleum Engineering',
      year_level: 'Level 100',
      hostel: 'KT Hall',
      membership_status: 'Associate',
      home_location: 'Takoradi, Western Region',
      department: 'Ushering',
      family_unit_id: fu1,
    },
    {
      id: 'mem_5',
      full_name: 'Emmanuel Nana Yaw Osei',
      phone: '+233246789012',
      email: 'enyosei@st.umat.edu.gh',
      dob: '2003-08-30',
      programme: 'BSc Mechanical Engineering',
      year_level: 'Level 300',
      hostel: 'Executive Hostel (Off-Campus)',
      membership_status: 'Pentecost Member',
      home_location: 'Accra, Greater Accra',
      department: 'Instrumentalist',
      family_unit_id: fu3,
    },
  ];

  for (const m of sampleMembers) {
    await run(
      `INSERT OR IGNORE INTO members (
        id, full_name, phone, email, dob, programme, year_level,
        hostel, membership_status, home_location, department,
        family_unit_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        m.id,
        m.full_name,
        m.phone,
        m.email,
        m.dob,
        m.programme,
        m.year_level,
        m.hostel,
        m.membership_status,
        m.home_location,
        m.department,
        m.family_unit_id,
        now,
        now,
      ]
    );
  }
}
