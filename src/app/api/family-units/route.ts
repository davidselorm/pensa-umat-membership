import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentExecutive } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const executive = await getCurrentExecutive();
    if (!executive) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    const stmt = db.prepare(`
      SELECT 
        f.id,
        f.name,
        f.leader_name,
        f.leader_phone,
        f.meeting_info,
        f.created_at,
        COUNT(m.id) AS member_count
      FROM family_units f
      LEFT JOIN members m ON m.family_unit_id = f.id
      GROUP BY f.id
      ORDER BY f.name ASC
    `);

    const units = stmt.all();
    return NextResponse.json({ units });
  } catch (error) {
    console.error('Error fetching family units:', error);
    return NextResponse.json({ error: 'Failed to fetch family units' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const executive = await getCurrentExecutive();
    if (!executive) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, leader_name, leader_phone, meeting_info } = await req.json();

    if (!name?.trim() || !leader_name?.trim() || !leader_phone?.trim()) {
      return NextResponse.json(
        { error: 'Name, leader name, and leader phone are required.' },
        { status: 400 }
      );
    }

    const db = getDb();
    const id = `fu_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO family_units (id, name, leader_name, leader_phone, meeting_info, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id, name.trim(), leader_name.trim(), leader_phone.trim(), meeting_info?.trim() || '', now);

    return NextResponse.json({ success: true, unitId: id, message: 'Family Unit created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating family unit:', error);
    return NextResponse.json({ error: 'Failed to create family unit' }, { status: 500 });
  }
}
