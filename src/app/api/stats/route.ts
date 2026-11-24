import { NextResponse } from 'next/server';
import { query, get } from '@/lib/db';
import { getCurrentExecutive } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const executive = await getCurrentExecutive();
    if (!executive) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const totalRes = await get<{ count: number }>('SELECT COUNT(*) as count FROM members');
    const pentecostRes = await get<{ count: number }>("SELECT COUNT(*) as count FROM members WHERE membership_status = 'Pentecost Member'");
    const associateRes = await get<{ count: number }>("SELECT COUNT(*) as count FROM members WHERE membership_status = 'Associate'");
    const unassignedRes = await get<{ count: number }>('SELECT COUNT(*) as count FROM members WHERE family_unit_id IS NULL OR family_unit_id = ""');

    // Breakdown by Level
    const levelsRes = await query<{ year_level: string; count: number }>(`
      SELECT year_level, COUNT(*) as count 
      FROM members 
      GROUP BY year_level
    `);

    const levelBreakdown: Record<string, number> = {};
    for (const row of levelsRes) {
      levelBreakdown[row.year_level] = row.count;
    }

    // Breakdown by Department
    const deptRes = await query<{ department: string; count: number }>(`
      SELECT department, COUNT(*) as count 
      FROM members 
      GROUP BY department
    `);

    const departmentBreakdown: Record<string, number> = {};
    for (const row of deptRes) {
      departmentBreakdown[row.department] = row.count;
    }

    return NextResponse.json({
      stats: {
        totalMembers: totalRes?.count || 0,
        pentecostCount: pentecostRes?.count || 0,
        associateCount: associateRes?.count || 0,
        unassignedCount: unassignedRes?.count || 0,
        levelBreakdown,
        departmentBreakdown,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
