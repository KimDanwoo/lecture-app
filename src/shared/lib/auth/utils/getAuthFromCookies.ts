import { cookies } from 'next/headers';

import { auth } from '@/shared/config';
import { AUTH_ROLES } from '@/shared/lib/auth/model/constants';
import type { Role } from '@/shared/lib/auth/model/types';

/**
 * @description 쿠키에서 인증 정보 가져오기
 * @returns 인증 정보
 */
export async function getAuthFromCookies(): Promise<{
  hasToken: boolean;
  role: Role | null;
}> {
  const cookieStore = await cookies();
  const hasToken = Boolean(cookieStore.get(auth.accessTokenCookieName)?.value);
  const rawRole = cookieStore.get(auth.roleCookieName)?.value ?? null;
  const role: Role | null = rawRole === AUTH_ROLES.STUDENT || rawRole === AUTH_ROLES.INSTRUCTOR ? rawRole : null;

  return { hasToken, role };
}
