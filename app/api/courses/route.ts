import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth } from '@/shared/config/auth';
import { backendProxyJson } from '@/shared/api/backendProxyJson';

export async function GET(req: Request) {
	const url = new URL(req.url);

	const cookieStore = await cookies();
	const token = cookieStore.get(auth.accessTokenCookieName)?.value;

	try {
		const { status, data } = await backendProxyJson(`/courses${url.search}`, {
			method: 'GET',
			cache: 'no-store',
			...(token ? { accessToken: token } : {}),
		});
		return NextResponse.json(data, { status });
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
		const { status, data } = await backendProxyJson('/courses', {
			method: 'POST',
			...(token ? { accessToken: token } : {}),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(body),
		});
		return NextResponse.json(data, { status });
	} catch {
		return NextResponse.json({ code: 'B001' }, { status: 502 });
	}
}
