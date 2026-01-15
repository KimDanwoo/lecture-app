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

export async function GET(req: Request) {
  const url = new URL(req.url);

  const cookieStore = await cookies();
  const token = cookieStore.get(auth.accessTokenCookieName)?.value;

  try {
    const { status, data } = await http.fetchJson<unknown>(joinUrl(BASE_URL, `/courses${url.search}`), {
      method: 'GET',
      cache: 'no-store',
      ...(token ? { accessToken: token } : {}),
    });

    return NextResponse.json(data ?? {}, { status });
  } catch {
    return NextResponse.json({ code: 'B001' }, { status: 502 });
  }
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(auth.accessTokenCookieName)?.value;

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ code: 'A001' }, { status: 400 });
  }

  try {
    const { status, data } = await http.fetchJson<unknown>(joinUrl(BASE_URL, '/courses'), {
      method: 'POST',
      ...(token ? { accessToken: token } : {}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    return NextResponse.json(data ?? {}, { status });
  } catch {
    return NextResponse.json({ code: 'B001' }, { status: 502 });
  }
}
