import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentExecutive } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const executive = await getCurrentExecutive();
    if (!executive) {
      return NextResponse.json({ error: 'Unauthorized. Executive access required.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.trim() || '';
    const level = searchParams.get('level')?.trim() || '';
    const hostel = searchParams.get('hostel')?.trim() || '';
    const programme = searchParams.get('programme')?.trim() || '';
    const status = searchParams.get('status')?.trim() || '';
    const department = searchParams.get('department')?.trim() || '';
    const familyUnit = searchParams.get('familyUnit')?.trim() || '';

    const db = getDb();

    let query = `
      SELECT 
        m.id, m.full_name, m.phone, m.email, m.dob, m.programme,
        m.year_level, m.hostel, m.membership_status, m.home_location,
        m.department, m.family_unit_id, m.created_at, m.updated_at,
        f.name AS family_unit_name
      FROM members m
      LEFT JOIN family_units f ON m.family_unit_id = f.id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (q) {
      query += ` AND (m.full_name LIKE ? OR m.phone LIKE ? OR m.email LIKE ?)`;
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    if (level && level !== 'ALL') {
      query += ` AND m.year_level = ?`;
      params.push(level);
    }

    if (hostel && hostel !== 'ALL') {
      query += ` AND m.hostel LIKE ?`;
      params.push(`%${hostel}%`);
    }

    if (programme && programme !== 'ALL') {
      query += ` AND m.programme LIKE ?`;
      params.push(`%${programme}%`);
    }

    if (status && status !== 'ALL') {
      query += ` AND m.membership_status = ?`;
      params.push(status);
    }

    if (department && department !== 'ALL') {
      query += ` AND m.department = ?`;
      params.push(department);
    }

    if (familyUnit && familyUnit !== 'ALL') {
      if (familyUnit === 'UNASSIGNED') {
        query += ` AND (m.family_unit_id IS NULL OR m.family_unit_id = '')`;
      } else {
        query += ` AND m.family_unit_id = ?`;
        params.push(familyUnit);
      }
    }

    query += ` ORDER BY m.created_at DESC`;

    const stmt = db.prepare(query);
    const members = stmt.all(...params);

    return NextResponse.json({ members });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      full_name,
      phone,
      email,
      dob,
      programme,
      year_level,
      hostel,
      membership_status,
      home_location,
      department,
      family_unit_id,
    } = body;

    // Validate required fields
    if (
      !full_name?.trim() ||
      !phone?.trim() ||
      !email?.trim() ||
      !dob?.trim() ||
      !programme?.trim() ||
      !year_level?.trim() ||
      !hostel?.trim() ||
      !membership_status?.trim() ||
      !home_location?.trim() ||
      !department?.trim()
    ) {
      return NextResponse.json(
        { error: 'All 10 registration fields are required.' },
        { status: 400 }
      );
    }

    const db = getDb();
    const id = `mem_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const insertStmt = db.prepare(`
      INSERT INTO members (
        id, full_name, phone, email, dob, programme,
        year_level, hostel, membership_status, home_location,
        department, family_unit_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      id,
      full_name.trim(),
      phone.trim(),
      email.trim(),
      dob.trim(),
      programme.trim(),
      year_level.trim(),
      hostel.trim(),
      membership_status.trim(),
      home_location.trim(),
      department.trim(),
      family_unit_id || null,
      now,
      now
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Welcome to PENSA UMaT.',
        memberId: id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering member:', error);
    return NextResponse.json({ error: 'Failed to submit registration' }, { status: 500 });
  }
}
