import { env } from '@/shared/config/env';
import { http, HttpError } from '@/shared/api/http';

export type ApiErrorPayload = {
	status: number;
	code?: string;
	message?: string;
};

export class ApiError extends Error {
	readonly payload: ApiErrorPayload;
	constructor(payload: ApiErrorPayload) {
		super(payload.message ?? `API Error (${payload.status})`);
		this.name = 'ApiError';
		this.payload = payload;
	}
}

function joinUrl(baseUrl: string, path: string) {
	const trimmedBase = baseUrl.replace(/\/+$/, '');
	const trimmedPath = path.replace(/^\/+/, '');
	return `${trimmedBase}/${trimmedPath}`;
}

export async function apiFetch<T>(path: string, init?: RequestInit & { accessToken?: string }): Promise<T> {
	const url = joinUrl(env.apiBaseUrl, path);

	try {
		return await http.request<T>(url, init);
	} catch (e) {
		if (e instanceof HttpError) {
			throw new ApiError({ status: e.payload.status, code: e.payload.code, message: e.payload.message });
		}
		throw e;
	}
}
