import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { http } from '@/shared/api/http';
import { auth } from '@/shared/config/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

function joinUrl(baseUrl: string, path: string) {
  const trimmedBase = baseUrl.replace(/\/+$/, '');
  const trimmedPath = path.replace(/^\/+/, '');
  return `${trimmedBase}/${trimmedPath}`;
}

type Params = { params: Promise<{ courseId: string }> };

export async function POST(_req: Request, { params }: Params) {
  const cookieStore = await cookies();
  const token = cookieStore.get(auth.accessTokenCookieName)?.value;

  const { courseId } = await params;

  try {
    const { status, data } = await http.fetchJson<unknown>(joinUrl(BASE_URL, `/courses/${courseId}/enroll`), {
      method: 'POST',
      ...(token ? { accessToken: token } : {}),
      headers: { Accept: 'application/json' },
    });
    return NextResponse.json(data ?? {}, { status });
  } catch {
    return NextResponse.json({ code: 'B001' }, { status: 502 });
  }
}
