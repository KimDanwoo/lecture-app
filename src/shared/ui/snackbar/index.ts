'use client';

import { useSnackbarStore } from '@/shared/model/store';

import { SnackbarHost } from './SnackbarHost';

export { SnackbarHost as Snackbar, SnackbarHost };

type ShowInput = {
  message: string;
  variant: 'success' | 'error';
  id?: string;
  durationMs?: number;
  bottomOffset?: number;
};

/**
 * @description 스낵바
 * @returns 스낵바
 */
export const snackbar = {
  show(input: ShowInput) {
    useSnackbarStore.getState().show(input);
  },
  success(message: string, options?: Omit<ShowInput, 'message' | 'variant'>) {
    useSnackbarStore.getState().show({ message, variant: 'success', ...options });
  },
  error(message: string, options?: Omit<ShowInput, 'message' | 'variant'>) {
    useSnackbarStore.getState().show({ message, variant: 'error', ...options });
  },
  clear() {
    useSnackbarStore.getState().clear();
  },
  setDefaultBottomOffset(value?: number) {
    useSnackbarStore.getState().setDefaultBottomOffset(value);
  },
  clearDefaultBottomOffset() {
    useSnackbarStore.getState().setDefaultBottomOffset(undefined);
  },
} as const;
