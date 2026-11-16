import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentExecutive } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const executive = await getCurrentExecutive();
    if (!executive) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { memberIds, familyUnitId } = await req.json();

    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      return NextResponse.json({ error: 'No members selected for bulk assignment' }, { status: 400 });
    }

    const db = getDb();
    const targetUnitId = familyUnitId === 'UNASSIGN' || !familyUnitId ? null : familyUnitId;

    if (targetUnitId) {
      const checkUnit = db.prepare('SELECT id, name FROM family_units WHERE id = ?');
      const unit = checkUnit.get(targetUnitId);
      if (!unit) {
        return NextResponse.json({ error: 'Selected Family Unit does not exist' }, { status: 400 });
      }
    }

    const placeholders = memberIds.map(() => '?').join(',');
    const stmt = db.prepare(`
      UPDATE members
      SET family_unit_id = ?, updated_at = ?
      WHERE id IN (${placeholders})
    `);

    stmt.run(targetUnitId, new Date().toISOString(), ...memberIds);

    return NextResponse.json({
      success: true,
      message: `Successfully assigned ${memberIds.length} member(s) to ${targetUnitId ? 'Family Unit' : 'Unassigned'}.`,
    });
  } catch (error) {
    console.error('Error bulk assigning members:', error);
    return NextResponse.json({ error: 'Failed to bulk assign members' }, { status: 500 });
  }
}
