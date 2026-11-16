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

    const totalRes = db.prepare('SELECT COUNT(*) as count FROM members').get() as { count: number };
    const pentecostRes = db.prepare("SELECT COUNT(*) as count FROM members WHERE membership_status = 'Pentecost Member'").get() as { count: number };
    const associateRes = db.prepare("SELECT COUNT(*) as count FROM members WHERE membership_status = 'Associate'").get() as { count: number };
    const unassignedRes = db.prepare('SELECT COUNT(*) as count FROM members WHERE family_unit_id IS NULL OR family_unit_id = ""').get() as { count: number };

    // Breakdown by Level
    const levelsRes = db.prepare(`
      SELECT year_level, COUNT(*) as count 
      FROM members 
      GROUP BY year_level
    `).all() as { year_level: string; count: number }[];

    const levelBreakdown: Record<string, number> = {};
    for (const row of levelsRes) {
      levelBreakdown[row.year_level] = row.count;
    }

    // Breakdown by Department
    const deptRes = db.prepare(`
      SELECT department, COUNT(*) as count 
      FROM members 
      GROUP BY department
    `).all() as { department: string; count: number }[];

    const departmentBreakdown: Record<string, number> = {};
    for (const row of deptRes) {
      departmentBreakdown[row.department] = row.count;
    }

    return NextResponse.json({
      stats: {
        totalMembers: totalRes.count || 0,
        pentecostCount: pentecostRes.count || 0,
        associateCount: associateRes.count || 0,
        unassignedCount: unassignedRes.count || 0,
        levelBreakdown,
        departmentBreakdown,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
