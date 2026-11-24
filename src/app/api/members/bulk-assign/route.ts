import { NextResponse } from 'next/server';
import { get, run } from '@/lib/db';
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

    const targetUnitId = familyUnitId === 'UNASSIGN' || !familyUnitId ? null : familyUnitId;

    if (targetUnitId) {
      const unit = await get('SELECT id, name FROM family_units WHERE id = ?', [targetUnitId]);
      if (!unit) {
        return NextResponse.json({ error: 'Selected Family Unit does not exist' }, { status: 400 });
      }
    }

    const placeholders = memberIds.map(() => '?').join(',');
    const sql = `
      UPDATE members
      SET family_unit_id = ?, updated_at = ?
      WHERE id IN (${placeholders})
    `;

    await run(sql, [targetUnitId, new Date().toISOString(), ...memberIds]);

    return NextResponse.json({
      success: true,
      message: `Successfully assigned ${memberIds.length} member(s) to ${targetUnitId ? 'Family Unit' : 'Unassigned'}.`,
    });
  } catch (error) {
    console.error('Error bulk assigning members:', error);
    return NextResponse.json({ error: 'Failed to bulk assign members' }, { status: 500 });
  }
}
