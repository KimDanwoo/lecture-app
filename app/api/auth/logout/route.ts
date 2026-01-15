import { NextResponse } from 'next/server';

import { auth } from '@/shared/config/auth';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(auth.accessTokenCookieName, '', { path: '/', maxAge: 0 });
  res.cookies.set(auth.roleCookieName, '', { path: '/', maxAge: 0 });
  return res;
}
