import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
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

    let sql = `
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

    sql += ` ORDER BY m.full_name ASC`;

    const members = await query(sql, params);

    // Escape CSV cell
    const escapeCsv = (str: any) => {
      if (str === null || str === undefined) return '""';
      const val = String(str).replace(/"/g, '""');
      return `"${val}"`;
    };

    const headers = [
      'Full Name',
      'Phone Number',
      'Email Address',
      'Date of Birth',
      'Programme of Study',
      'Year Level',
      'Hostel / Residence',
      'Membership Status',
      'Home Location',
      'Church Department',
      'Family Unit',
      'Registered Date',
    ];

    const rows = members.map((m: any) => [
      escapeCsv(m.full_name),
      escapeCsv(m.phone),
      escapeCsv(m.email),
      escapeCsv(m.dob),
      escapeCsv(m.programme),
      escapeCsv(m.year_level),
      escapeCsv(m.hostel),
      escapeCsv(m.membership_status),
      escapeCsv(m.home_location),
      escapeCsv(m.department),
      escapeCsv(m.family_unit),
      escapeCsv(new Date(m.created_at).toLocaleDateString()),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r: any[]) => r.join(','))].join('\r\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="pensa-umat-members-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting members to CSV:', error);
    return NextResponse.json({ error: 'Failed to generate CSV export' }, { status: 500 });
  }
}
