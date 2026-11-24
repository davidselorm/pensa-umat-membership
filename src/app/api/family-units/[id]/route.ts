import { NextResponse } from 'next/server';
import { run } from '@/lib/db';
import { getCurrentExecutive } from '@/lib/auth';

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
    const { name, leader_name, leader_phone, meeting_info } = await req.json();

    await run(
      `UPDATE family_units
       SET name = COALESCE(?, name),
           leader_name = COALESCE(?, leader_name),
           leader_phone = COALESCE(?, leader_phone),
           meeting_info = COALESCE(?, meeting_info)
       WHERE id = ?`,
      [name?.trim(), leader_name?.trim(), leader_phone?.trim(), meeting_info?.trim(), id]
    );

    return NextResponse.json({ success: true, message: 'Family Unit updated' });
  } catch (error) {
    console.error('Error updating family unit:', error);
    return NextResponse.json({ error: 'Failed to update family unit' }, { status: 500 });
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

    // Set any members in this unit to NULL
    await run('UPDATE members SET family_unit_id = NULL WHERE family_unit_id = ?', [id]);
    await run('DELETE FROM family_units WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Family Unit deleted and members unassigned' });
  } catch (error) {
    console.error('Error deleting family unit:', error);
    return NextResponse.json({ error: 'Failed to delete family unit' }, { status: 500 });
  }
}
