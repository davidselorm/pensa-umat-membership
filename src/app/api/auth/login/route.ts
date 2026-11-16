import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const db = getDb();
    const stmt = db.prepare('SELECT id, name, email, password, role FROM executives WHERE LOWER(email) = LOWER(?)');
    const user = stmt.get(email.trim()) as { id: string; name: string; email: string; password: string; role: string } | undefined;

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid executive credentials' },
        { status: 401 }
      );
    }

    const token = createSessionToken(user.id);
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error logging in' }, { status: 500 });
  }
}
