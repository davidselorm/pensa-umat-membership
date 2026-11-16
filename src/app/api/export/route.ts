import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentExecutive } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const executive = await getCurrentExecutive();
    if (!executive) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
        m.full_name, m.phone, m.email, m.dob, m.programme,
        m.year_level, m.hostel, m.membership_status, m.home_location,
        m.department, COALESCE(f.name, 'Unassigned') AS family_unit,
        m.created_at
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

    query += ` ORDER BY m.full_name ASC`;

    const stmt = db.prepare(query);
    const rows = stmt.all(...params) as any[];

    // Build CSV content
    const headers = [
      'Full Name',
      'Phone Number',
      'Email',
      'Date of Birth',
      'Programme of Study',
      'Year Level',
      'Hostel / Hall',
      'Membership Status',
      'Where You Stay Back at Home',
      'Church Department',
      'Family Unit',
      'Date Registered'
    ];

    const escapeCsv = (str: any) => {
      if (str === null || str === undefined) return '""';
      const s = String(str).replace(/"/g, '""');
      return `"${s}"`;
    };

    const csvLines = [
      headers.join(','),
      ...rows.map((r) =>
        [
          escapeCsv(r.full_name),
          escapeCsv(r.phone),
          escapeCsv(r.email),
          escapeCsv(r.dob),
          escapeCsv(r.programme),
          escapeCsv(r.year_level),
          escapeCsv(r.hostel),
          escapeCsv(r.membership_status),
          escapeCsv(r.home_location),
          escapeCsv(r.department),
          escapeCsv(r.family_unit),
          escapeCsv(r.created_at ? new Date(r.created_at).toLocaleDateString() : '')
        ].join(',')
      ),
    ];

    const csvContent = csvLines.join('\r\n');

    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="pensa_umat_members_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error generating CSV:', error);
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 });
  }
}
