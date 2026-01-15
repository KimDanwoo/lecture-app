import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entities/auth/api';
import { useUserStore } from '@/features/auth/model/store';

export function useLoginMutation() {
  const setUser = useUserStore((s) => s.setUser);
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
}

export function useSignupMutation() {
  return useMutation({
    mutationFn: authApi.signup,
  });
}

export function useLogoutMutation() {
  const clearUser = useUserStore((s) => s.clearUser);
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearUser();
    },
  });
}
