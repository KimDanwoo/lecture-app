import { headers } from 'next/headers';

/**
 * @description 요청 원본 도메인 가져오기
 * @returns 요청 원본 도메인
 */
export async function getRequestOrigin() {
  const h = await headers();
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  return `${proto}://${host}`;
}
