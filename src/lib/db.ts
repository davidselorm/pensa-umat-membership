import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

const DB_DIR = process.env.VERCEL ? os.tmpdir() : path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'pensa.db');

let _db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (_db) return _db;

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  _db = new DatabaseSync(DB_PATH);
  _db.exec('PRAGMA foreign_keys = ON;');
  initSchema(_db);
  seedInitialData(_db);

  return _db;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
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
  `);
}

function seedInitialData(db: DatabaseSync) {
  const memberCountStmt = db.prepare('SELECT COUNT(*) as count FROM members');
  const result = memberCountStmt.get() as { count: number };

  if (result && result.count > 0) {
    return;
  }

  // Seed default executive
  const insertExec = db.prepare(`
    INSERT OR IGNORE INTO executives (id, name, email, password, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertExec.run('exec_admin', 'PENSA Secretariat', 'admin@pensa-umat.org', 'pensa2026!', 'Administrator', new Date().toISOString());

  // Seed Family Units
  const insertFamily = db.prepare(`
    INSERT INTO family_units (id, name, leader_name, leader_phone, meeting_info, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const fu1 = 'fu_kt_hall';
  const fu2 = 'fu_chamber_gold';
  const fu3 = 'fu_off_campus';

  insertFamily.run(fu1, 'KT Hall Family Unit', 'Eld. Emmanuel Ofori', '+233541234567', 'Sundays 4:30 PM @ KT Hall Common Room', new Date().toISOString());
  insertFamily.run(fu2, 'Chamber & Gold Refinery Cell', 'Dcn. Samuel Mensah', '+233249876543', 'Sundays 5:00 PM @ Chamber Forecourt', new Date().toISOString());
  insertFamily.run(fu3, 'Tarkwa Banso & Off-Campus Cell', 'Sis. Priscilla Addo', '+233501122334', 'Sundays 4:00 PM @ Grace Hostel Lounge', new Date().toISOString());

  // Seed 14 realistic UMaT students
  const insertMember = db.prepare(`
    INSERT INTO members (
      id, full_name, phone, email, dob, programme, year_level,
      hostel, membership_status, home_location, department,
      family_unit_id, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

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
      family_unit_id: fu1
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
      family_unit_id: fu2
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
      family_unit_id: fu2
    },
    {
      id: 'mem_4',
      full_name: 'Grace Efua Nyarko',
      phone: '+233553344556',
      email: 'genyarko@st.umat.edu.gh',
      dob: '2005-02-14',
      programme: 'BSc Petroleum Engineering',
      year_level: 'Level 100',
      hostel: 'Executive Hostel (Off-Campus)',
      membership_status: 'Associate',
      home_location: 'Cape Coast, Central Region',
      department: 'Ushering',
      family_unit_id: fu3
    },
    {
      id: 'mem_5',
      full_name: 'Kofi Mensah Annan',
      phone: '+233207788990',
      email: 'kmannan@st.umat.edu.gh',
      dob: '2003-07-08',
      programme: 'BSc Mechanical Engineering',
      year_level: 'Level 300',
      hostel: 'KT Hall',
      membership_status: 'Pentecost Member',
      home_location: 'Takoradi, Western Region',
      department: 'Instrumentalist',
      family_unit_id: fu1
    },
    {
      id: 'mem_6',
      full_name: 'Akosua Boadiwaa Frimpong',
      phone: '+233246655443',
      email: 'abfrimpong@st.umat.edu.gh',
      dob: '2004-12-03',
      programme: 'BSc Minerals Engineering',
      year_level: 'Level 200',
      hostel: 'Grace Hostel (Off-Campus)',
      membership_status: 'Pentecost Member',
      home_location: 'Koforidua, Eastern Region',
      department: 'Prayer / Evangelism',
      family_unit_id: fu3
    },
    {
      id: 'mem_7',
      full_name: 'Emmanuel Kwesi Appiah',
      phone: '+233549988776',
      email: 'ekappiah@st.umat.edu.gh',
      dob: '2001-08-30',
      programme: 'BSc Geomatic Engineering',
      year_level: 'Level 400',
      hostel: 'Chamber of Mines Hall',
      membership_status: 'Associate',
      home_location: 'Tema, Greater Accra',
      department: 'Protocol',
      family_unit_id: fu2
    },
    {
      id: 'mem_8',
      full_name: 'Blessing Eyram Dogbe',
      phone: '+233245566778',
      email: 'bedogbe@st.umat.edu.gh',
      dob: '2005-05-19',
      programme: 'BSc Environmental and Safety Engineering',
      year_level: 'Level 100',
      hostel: 'Gold Refinery Hall',
      membership_status: 'Pentecost Member',
      home_location: 'Teshie, Accra',
      department: 'Choir',
      family_unit_id: null // Unassigned
    },
    {
      id: 'mem_9',
      full_name: 'Yaw Osei Tutu',
      phone: '+233501239876',
      email: 'yotutu@st.umat.edu.gh',
      dob: '2003-10-10',
      programme: 'BSc Renewable Energy Engineering',
      year_level: 'Level 300',
      hostel: 'Jerusalem Hostel (Off-Campus)',
      membership_status: 'Pentecost Member',
      home_location: 'Mampong, Ashanti Region',
      department: 'None / General Member',
      family_unit_id: null // Unassigned
    },
    {
      id: 'mem_10',
      full_name: 'Mercy Ama Konadu',
      phone: '+233248899001',
      email: 'makonadu@st.umat.edu.gh',
      dob: '2002-03-22',
      programme: 'BSc Mathematical Sciences',
      year_level: 'Level 400',
      hostel: 'KT Hall',
      membership_status: 'Pentecost Member',
      home_location: 'Berekum, Bono Region',
      department: 'Media',
      family_unit_id: fu1
    },
    {
      id: 'mem_11',
      full_name: 'Kelvin Nana Addo',
      phone: '+233558811223',
      email: 'knaddo@st.umat.edu.gh',
      dob: '2005-01-15',
      programme: 'BSc Computer Science and Engineering',
      year_level: 'Level 100',
      hostel: 'Railway Quarters (Off-Campus)',
      membership_status: 'Associate',
      home_location: 'Spintex, Accra',
      department: 'Organizing',
      family_unit_id: null // Unassigned
    },
    {
      id: 'mem_12',
      full_name: 'Deborah Akua Tetteh',
      phone: '+233243322119',
      email: 'datetteh@st.umat.edu.gh',
      dob: '2000-06-17',
      programme: 'MSc Mining Engineering',
      year_level: 'Postgraduate',
      hostel: 'Executive Hostel (Off-Campus)',
      membership_status: 'Pentecost Member',
      home_location: 'Takoradi, Western Region',
      department: 'Ushering',
      family_unit_id: fu3
    },
    {
      id: 'mem_13',
      full_name: 'Prince Gyasi Antwi',
      phone: '+233547766554',
      email: 'pgantwi@st.umat.edu.gh',
      dob: '2004-11-05',
      programme: 'BSc Petroleum Engineering',
      year_level: 'Level 200',
      hostel: 'Gold Refinery Hall',
      membership_status: 'Pentecost Member',
      home_location: 'Kumasi, Ashanti Region',
      department: 'Instrumentalist',
      family_unit_id: null // Unassigned
    },
    {
      id: 'mem_14',
      full_name: 'Faith Mawusi Doe',
      phone: '+233209988771',
      email: 'fmdoe@st.umat.edu.gh',
      dob: '2003-09-14',
      programme: 'BSc Computer Science and Engineering',
      year_level: 'Level 300',
      hostel: 'Chamber of Mines Hall',
      membership_status: 'Pentecost Member',
      home_location: 'Aflao, Volta Region',
      department: 'Prayer / Evangelism',
      family_unit_id: fu2
    }
  ];

  for (const m of sampleMembers) {
    insertMember.run(
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
      now
    );
  }
}
