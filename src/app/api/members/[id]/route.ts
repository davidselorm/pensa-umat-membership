import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentExecutive } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const executive = await getCurrentExecutive();
    if (!executive) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const db = getDb();
    const stmt = db.prepare(`
      SELECT 
        m.*, f.name AS family_unit_name 
      FROM members m
      LEFT JOIN family_units f ON m.family_unit_id = f.id
      WHERE m.id = ?
    `);

    const member = stmt.get(id);
    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json({ member });
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json({ error: 'Failed to fetch member' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const executive = await getCurrentExecutive();
    if (!executive) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const db = getDb();

    // Check if exists
    const checkStmt = db.prepare('SELECT id FROM members WHERE id = ?');
    const existing = checkStmt.get(id);
    if (!existing) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    const updateFields: string[] = [];
    const values: any[] = [];

    const allowed = [
      'full_name',
      'phone',
      'email',
      'dob',
      'programme',
      'year_level',
      'hostel',
      'membership_status',
      'home_location',
      'department',
      'family_unit_id',
    ];

    for (const key of allowed) {
      if (body[key] !== undefined) {
        updateFields.push(`${key} = ?`);
        values.push(body[key] === '' ? null : body[key]);
      }
    }

    if (updateFields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    updateFields.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(id);

    const updateStmt = db.prepare(`
      UPDATE members 
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `);

    updateStmt.run(...values);

    return NextResponse.json({ success: true, message: 'Member updated successfully' });
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const executive = await getCurrentExecutive();
    if (!executive) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const db = getDb();
    const stmt = db.prepare('DELETE FROM members WHERE id = ?');
    stmt.run(id);

    return NextResponse.json({ success: true, message: 'Member deleted' });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}
