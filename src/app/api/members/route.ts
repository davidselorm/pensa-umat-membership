import { NextResponse } from 'next/server';
import { query, get, run } from '@/lib/db';
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

    let sql = `
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
      sql += ` AND (m.full_name LIKE ? OR m.phone LIKE ? OR m.email LIKE ?)`;
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    if (level && level !== 'ALL') {
      sql += ` AND m.year_level = ?`;
      params.push(level);
    }

    if (hostel && hostel !== 'ALL') {
      sql += ` AND m.hostel LIKE ?`;
      params.push(`%${hostel}%`);
    }

    if (programme && programme !== 'ALL') {
      sql += ` AND m.programme LIKE ?`;
      params.push(`%${programme}%`);
    }

    if (status && status !== 'ALL') {
      sql += ` AND m.membership_status = ?`;
      params.push(status);
    }

    if (department && department !== 'ALL') {
      sql += ` AND m.department = ?`;
      params.push(department);
    }

    if (familyUnit && familyUnit !== 'ALL') {
      if (familyUnit === 'UNASSIGNED') {
        sql += ` AND (m.family_unit_id IS NULL OR m.family_unit_id = '')`;
      } else {
        sql += ` AND m.family_unit_id = ?`;
        params.push(familyUnit);
      }
    }

    sql += ` ORDER BY m.created_at DESC`;

    const members = await query(sql, params);

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

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();

    // Duplicate detection: extract last 9 digits of phone to match local & international variations
    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    const phoneSuffix = digitsOnly.length >= 9 ? digitsOnly.slice(-9) : digitsOnly;

    const existing = await get<{ id: string; full_name: string }>(
      `SELECT id, full_name FROM members 
       WHERE LOWER(email) = LOWER(?) 
          OR REPLACE(REPLACE(REPLACE(phone, ' ', ''), '-', ''), '+', '') LIKE ?
       LIMIT 1`,
      [trimmedEmail, `%${phoneSuffix}`]
    );

    if (existing) {
      return NextResponse.json(
        {
          error: `A member with this phone number or email address is already registered (${existing.full_name}). If you need to update your details, please contact a PENSA executive.`,
        },
        { status: 409 }
      );
    }

    const id = `mem_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    await run(
      `INSERT INTO members (
        id, full_name, phone, email, dob, programme,
        year_level, hostel, membership_status, home_location,
        department, family_unit_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        full_name.trim(),
        trimmedPhone,
        trimmedEmail,
        dob.trim(),
        programme.trim(),
        year_level.trim(),
        hostel.trim(),
        membership_status.trim(),
        home_location.trim(),
        department.trim(),
        family_unit_id || null,
        now,
        now,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        memberId: id,
        message: 'Registration successful! Welcome to PENSA UMaT.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing registration.' },
      { status: 500 }
    );
  }
}
