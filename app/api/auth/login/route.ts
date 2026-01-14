import { NextResponse } from 'next/server';
import { auth } from '@/shared/config/auth';
import { backendProxyJson } from '@/shared/api/backendProxyJson';

type LoginResponse = {
  accessToken?: string;
  user?: {
    role?: string;
    name?: string;
  };
  [key: string]: unknown;
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ code: 'A001', message: '요청 본문이 올바르지 않습니다.' }, { status: 400 });
  }

  try {
    const { status, data } = await backendProxyJson('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });

    const payload = (data ?? {}) as LoginResponse;
    const out = NextResponse.json(payload, { status });

    // 성공 시에만 쿠키 세팅(클라 검증과 별개로, 서버는 신뢰 경계라서 최소 방어는 유지)
    if (status >= 200 && status < 300 && payload.accessToken) {
      const cookieBase = {
        httpOnly: true,
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24,
      };

      out.cookies.set(auth.accessTokenCookieName, String(payload.accessToken), cookieBase);

      if (payload.user?.role) {
        out.cookies.set(auth.roleCookieName, String(payload.user.role), cookieBase);
      }
    }

    return out;
  } catch {
    return NextResponse.json({ code: 'B001' }, { status: 502 });
  }
}
