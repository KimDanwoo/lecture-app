import { NextResponse } from 'next/server';

import { http } from '@/shared/api/http';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

function joinUrl(baseUrl: string, path: string) {
  const trimmedBase = baseUrl.replace(/\/+$/, '');
  const trimmedPath = path.replace(/^\/+/, '');
  return `${trimmedBase}/${trimmedPath}`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ code: 'A001' }, { status: 400 });
  }

  try {
    const { status, data } = await http.fetchJson<unknown>(joinUrl(BASE_URL, '/users/signup'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    return NextResponse.json(data ?? {}, { status });
  } catch {
    return NextResponse.json({ code: 'B001' }, { status: 502 });
  }
}
