import { NextResponse } from 'next/server';
import { get, run } from '@/lib/db';
import { createSessionToken, verifyPassword, hashPassword, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await get<{ id: string; name: string; email: string; password: string; role: string }>(
      'SELECT id, name, email, password, role FROM executives WHERE LOWER(email) = LOWER(?)',
      [email.trim()]
    );

    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json(
        { error: 'Invalid executive credentials' },
        { status: 401 }
      );
    }

    // If user's password was plain text, automatically upgrade to salted scrypt hash
    if (!user.password.includes(':')) {
      const upgradedHash = hashPassword(password);
      await run('UPDATE executives SET password = ? WHERE id = ?', [upgradedHash, user.id]);
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
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error logging in' }, { status: 500 });
  }
}
