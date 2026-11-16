import { cookies } from 'next/headers';
import { getDb } from './db';
import { Executive } from './types';

const SESSION_COOKIE_NAME = 'pensa_exec_token';
const SESSION_SECRET = 'pensa-umat-exec-secret-2026';

export function createSessionToken(userId: string): string {
  const payload = {
    userId,
    ts: Date.now(),
  };
  const str = JSON.stringify(payload);
  const base64 = Buffer.from(str).toString('base64');
  return `${base64}.${Buffer.from(SESSION_SECRET).toString('base64').substring(0, 10)}`;
}

export function parseSessionToken(token: string): { userId: string } | null {
  try {
    const [payloadBase64] = token.split('.');
    if (!payloadBase64) return null;
    const str = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const data = JSON.parse(str);
    if (!data.userId) return null;
    return { userId: data.userId };
  } catch {
    return null;
  }
}

export async function getCurrentExecutive(): Promise<Executive | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const parsed = parseSessionToken(token);
  if (!parsed) return null;

  const db = getDb();
  const stmt = db.prepare('SELECT id, name, email, role FROM executives WHERE id = ?');
  const user = stmt.get(parsed.userId) as Executive | undefined;
  return user || null;
}

export { SESSION_COOKIE_NAME };
