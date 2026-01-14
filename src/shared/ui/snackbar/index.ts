'use client';

import { useSnackbarStore } from '@/shared/model/store';
export { SnackbarHost } from './SnackbarHost';
export { useSnackbarStore } from '@/shared/model/store';
export type { SnackbarItem, SnackbarVariant } from '@/shared/model/store';

/**
 * 어디서든 바로 호출할 수 있는 전역 API
 *
 * 사용 예:
 * - snackbar.show({ message: '저장 완료', variant: 'success' })
 * - snackbar.success('저장 완료')
 */
export const snackbar = {
	show(input: {
		message: string;
		variant: 'success' | 'error';
		id?: string;
		durationMs?: number;
		bottomOffset?: number;
	}) {
		useSnackbarStore.getState().show(input);
	},
	success(message: string, durationOrOptions?: number | { durationMs?: number; bottomOffset?: number }) {
		const options =
			typeof durationOrOptions === 'number' ? { durationMs: durationOrOptions } : (durationOrOptions ?? {});
		useSnackbarStore.getState().show({ message, variant: 'success', ...options });
	},
	error(message: string, durationOrOptions?: number | { durationMs?: number; bottomOffset?: number }) {
		const options =
			typeof durationOrOptions === 'number' ? { durationMs: durationOrOptions } : (durationOrOptions ?? {});
		useSnackbarStore.getState().show({ message, variant: 'error', ...options });
	},
	setDefaultBottomOffset(bottomOffset?: number) {
		useSnackbarStore.getState().setDefaultBottomOffset(bottomOffset);
	},
	clearDefaultBottomOffset() {
		useSnackbarStore.getState().setDefaultBottomOffset(undefined);
	},
	clear() {
		useSnackbarStore.getState().clear();
	},
} as const;

