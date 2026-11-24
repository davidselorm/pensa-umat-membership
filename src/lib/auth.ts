import { cookies } from 'next/headers';
import crypto from 'node:crypto';
import { get } from './db';
import { Executive } from './types';

const SESSION_COOKIE_NAME = 'pensa_exec_token';
const SESSION_SECRET = process.env.SESSION_SECRET || 'pensa-umat-exec-secret-2026-production-key';

// Password hashing using scrypt
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash) return false;

  // If plain text (legacy/fallback), use timingSafeEqual
  if (!storedHash.includes(':')) {
    const pwBuf = Buffer.from(password);
    const hashBuf = Buffer.from(storedHash);
    if (pwBuf.length !== hashBuf.length) return false;
    return crypto.timingSafeEqual(pwBuf, hashBuf);
  }

  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;

  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  if (keyBuffer.length !== derivedKey.length) return false;

  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

export function createSessionToken(userId: string): string {
  const payload = {
    userId,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadStr)
    .digest('base64url');

  return `${payloadStr}.${signature}`;
}

export function parseSessionToken(token: string): { userId: string } | null {
  try {
    const [payloadStr, signature] = token.split('.');
    if (!payloadStr || !signature) return null;

    const expectedSig = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(payloadStr)
      .digest('base64url');

    if (expectedSig.length !== signature.length) {
      return null;
    }

    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSig);

    if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
    if (!payload.userId) return null;

    // Check expiration
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }

    return { userId: payload.userId };
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

  const user = await get<Executive>('SELECT id, name, email, role FROM executives WHERE id = ?', [parsed.userId]);
  return user || null;
}

export { SESSION_COOKIE_NAME };
