import { NextResponse } from 'next/server';
import { backendProxyJson } from '@/shared/api/backendProxyJson';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ code: 'A001' }, { status: 400 });
  }

  try {
    const { status, data } = await backendProxyJson('/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    return NextResponse.json(data, { status });
  } catch {
    return NextResponse.json({ code: 'B001' }, { status: 502 });
  }
}
