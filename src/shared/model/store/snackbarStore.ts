'use client';

import { create } from 'zustand';

export type SnackbarVariant = 'success' | 'error';

export type SnackbarItem = {
	id: string;
	message: string;
	variant: SnackbarVariant;
	/**
	 * 스낵바를 bottom에서 얼마나 띄울지(px).
	 * - 지정하지 않으면 기본값(스타일의 16px)을 사용합니다.
	 * - 특정 화면에서 하단 고정 바 위로 띄우고 싶을 때 사용합니다.
	 */
	bottomOffset?: number;
	/**
	 * 표시 유지 시간(ms). 최소 4000ms 보장.
	 */
	durationMs: number;
};

type SnackbarState = {
	items: SnackbarItem[];
	/**
	 * 화면 단위 기본 bottom offset(px).
	 * - 예: 강의 신청 화면에서 하단 고정 버튼을 가리지 않도록 스낵바를 위로 띄우기
	 */
	defaultBottomOffset?: number;
	show: (item: {
		message: string;
		variant: SnackbarVariant;
		id?: string;
		durationMs?: number;
		bottomOffset?: number;
	}) => void;
	remove: (id: string) => void;
	clear: () => void;
	setDefaultBottomOffset: (value?: number) => void;
};

function makeId() {
	return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const useSnackbarStore = create<SnackbarState>((set, get) => ({
	items: [],
	defaultBottomOffset: undefined,
	show: (item) => {
		const next: SnackbarItem = {
			id: item.id ?? makeId(),
			message: item.message,
			variant: item.variant,
			bottomOffset:
				typeof item.bottomOffset === 'number' && Number.isFinite(item.bottomOffset) ? item.bottomOffset : undefined,
			durationMs: Math.max(item.durationMs ?? 4000, 4000),
		};

		const { items } = get();
		set({ items: [...items, next] });
	},
	remove: (id) => {
		const { items } = get();
		set({ items: items.filter((x) => x.id !== id) });
	},
	clear: () => set({ items: [] }),
	setDefaultBottomOffset: (value) => {
		if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
			set({ defaultBottomOffset: value });
		} else {
			set({ defaultBottomOffset: undefined });
		}
	},
}));

