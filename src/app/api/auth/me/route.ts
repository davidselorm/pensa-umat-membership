import { NextResponse } from 'next/server';
import { getCurrentExecutive } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const executive = await getCurrentExecutive();
    if (!executive) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }
    return NextResponse.json({ authenticated: true, user: executive });
  } catch (error) {
    console.error('Check auth error:', error);
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}
