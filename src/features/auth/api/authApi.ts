import { AUTH_ROLES } from '@/entities/auth/model/constants';
import { AUTH_API_PATHS } from '@/features/auth/api';
import { http } from '@/shared/api/http';

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

export const authApi = Object.freeze({
  logout() {
    return http.post<{ ok: boolean }>(AUTH_API_PATHS.LOGOUT);
  },

  login(body: { email: string; password: string }) {
    return http.post<LoginResponse>(AUTH_API_PATHS.LOGIN, body);
  },

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
