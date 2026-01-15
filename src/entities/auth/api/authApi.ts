import { AUTH_API_PATHS } from '@/entities/auth/api';
import { http } from '@/shared/api';
import { AUTH_ROLES } from '@/shared/lib/auth/model/constants';

export type LoginResponse = {
  accessToken: string;
  tokenType: string;
  user: {
    id: number;
    email: string;
    name: string;
    phone: string;
    role: typeof AUTH_ROLES.STUDENT | typeof AUTH_ROLES.INSTRUCTOR;
  };
};

/**
 * @description 인증 API
 */
export const authApi = Object.freeze({
  // 로그아웃
  logout() {
    return http.post<{ ok: boolean }>(AUTH_API_PATHS.LOGOUT);
  },

  // 로그인
  login(body: { email: string; password: string }) {
    return http.post<LoginResponse>(AUTH_API_PATHS.LOGIN, body);
  },

  // 회원가입
  signup(body: {
    email: string;
    password: string;
    name: string;
    phone: string;
    role: typeof AUTH_ROLES.STUDENT | typeof AUTH_ROLES.INSTRUCTOR;
  }) {
    return http.post<unknown>(AUTH_API_PATHS.SIGNUP, body);
  },
});
