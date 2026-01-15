import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entities/auth/api';
import { useUserStore } from '@/features/auth/model/store';

/**
 * @description 로그인
 */
export function useLoginMutation() {
  const setUser = useUserStore((s) => s.setUser);
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
}

/**
 * @description 회원가입
 */
export function useSignupMutation() {
  return useMutation({
    mutationFn: authApi.signup,
  });
}

/**
 * @description 로그아웃
 */
export function useLogoutMutation() {
  const clearUser = useUserStore((s) => s.clearUser);
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearUser();
    },
  });
}
