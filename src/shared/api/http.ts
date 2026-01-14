export type HttpErrorPayload = {
  status: number;
  code?: string;
  message?: string;
  data?: unknown;
};

export class HttpError extends Error {
  readonly payload: HttpErrorPayload;
  constructor(payload: HttpErrorPayload) {
    super(payload.message ?? `HTTP Error (${payload.status})`);
    this.name = 'HttpError';
    this.payload = payload;
  }
}

async function safeParseJson(res: Response) {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

export const http = {
  async fetchJson<T>(
    path: string,
    init?: RequestInit & { accessToken?: string },
  ): Promise<{ ok: boolean; status: number; data: T }> {
    const headers = new Headers(init?.headers);
    if (!headers.has('Accept')) headers.set('Accept', 'application/json');
    if (init?.accessToken) headers.set('Authorization', `Bearer ${init.accessToken}`);

    const res = await fetch(path, { ...init, headers });
    const data = (await safeParseJson(res)) as T;
    return { ok: res.ok, status: res.status, data };
  },

  async request<T>(path: string, init?: RequestInit & { accessToken?: string }): Promise<T> {
    const headers = new Headers(init?.headers);
    if (!headers.has('Accept')) headers.set('Accept', 'application/json');
    if (init?.accessToken) headers.set('Authorization', `Bearer ${init.accessToken}`);

    const res = await fetch(path, { ...init, headers });

    if (!res.ok) {
      const data = await safeParseJson(res);
      throw new HttpError({
        status: res.status,
        code: data?.code,
        message: data?.message ?? data?.error ?? res.statusText,
        data,
      });
    }

    return (await safeParseJson(res)) as T;
  },

  get<T>(path: string, init?: RequestInit & { accessToken?: string }) {
    return this.request<T>(path, { ...init, method: 'GET' });
  },

  post<T>(path: string, body?: unknown, init?: RequestInit & { accessToken?: string }) {
    const headers = new Headers(init?.headers);
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    return this.request<T>(path, { ...init, method: 'POST', headers, body: JSON.stringify(body ?? {}) });
  },

  put<T>(path: string, body?: unknown, init?: RequestInit & { accessToken?: string }) {
    const headers = new Headers(init?.headers);
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    return this.request<T>(path, { ...init, method: 'PUT', headers, body: JSON.stringify(body ?? {}) });
  },

  patch<T>(path: string, body?: unknown, init?: RequestInit & { accessToken?: string }) {
    const headers = new Headers(init?.headers);
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    return this.request<T>(path, { ...init, method: 'PATCH', headers, body: JSON.stringify(body ?? {}) });
  },

  delete<T>(path: string, init?: RequestInit & { accessToken?: string }) {
    return this.request<T>(path, { ...init, method: 'DELETE' });
  },
} as const;
