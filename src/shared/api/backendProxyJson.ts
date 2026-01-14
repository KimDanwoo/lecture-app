import { env } from '@/shared/config/env';
import { http } from '@/shared/api/http';

function joinUrl(baseUrl: string, path: string) {
	const trimmedBase = baseUrl.replace(/\/+$/, '');
	const trimmedPath = path.replace(/^\/+/, '');
	return `${trimmedBase}/${trimmedPath}`;
}

type ProxyResult = { status: number; data: unknown };

export async function backendProxyJson(
	path: string,
	init?: RequestInit & { accessToken?: string }
): Promise<ProxyResult> {
	const url = joinUrl(env.apiBaseUrl, path);
	try {
		const res = await http.fetchJson<unknown>(url, init);
		return { status: res.status, data: res.data ?? {} };
	} catch (e) {
		// 네트워크/연결 실패는 호출부에서 502(code:B001)로 처리
		throw e;
	}
}
