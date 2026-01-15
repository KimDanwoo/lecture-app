'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Role } from '@/shared/lib/auth/model/types';

export type UserInfo = {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: Role;
};

type UserStoreState = {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
};

/**
 * NOTE: user 정보는 매번 서버에서 갱신할 수 있는 API가 없어서(또는 단순화를 위해)
 * 임시로 localStorage에 저장(persist)합니다.
 * 토큰은 여전히 HttpOnly 쿠키로 관리합니다.
 */
export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'lecture_user',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
