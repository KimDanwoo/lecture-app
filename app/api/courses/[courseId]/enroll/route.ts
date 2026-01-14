import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth } from '@/shared/config/auth';
import { backendProxyJson } from '@/shared/api/backendProxyJson';

type Params = { params: Promise<{ courseId: string }> };

export async function POST(_req: Request, { params }: Params) {
  const cookieStore = await cookies();
  const token = cookieStore.get(auth.accessTokenCookieName)?.value;

  const { courseId } = await params;

  try {
    const { status, data } = await backendProxyJson(`/courses/${courseId}/enroll`, {
      method: 'POST',
      ...(token ? { accessToken: token } : {}),
      headers: { Accept: 'application/json' },
    });
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ code: 'B001' }, { status: 502 });
  }
}
