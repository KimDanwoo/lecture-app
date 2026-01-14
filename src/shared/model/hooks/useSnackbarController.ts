'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { SnackbarItem } from '@/shared/model/store';

const MAX_ITEMS = 6;
const EXIT_MS = 200;

/**
 * Snackbar 리스트의 lifecycle(자동 종료, max 개수 제한, exit 애니메이션 상태)을 관리합니다.
 *
 * - 최신은 items 배열의 끝(맨 아래)
 * - max 초과분은 먼저 exit 애니메이션 후 제거
 * - 각 item은 durationMs 후 자동 종료(최소 4000ms는 store에서 보장)
 */
export function useSnackbarController(items: SnackbarItem[], remove: (id: string) => void) {
	const [leavingIds, setLeavingIds] = useState<Set<string>>(() => new Set());
	const timersRef = useRef<Map<string, number>>(new Map());

	const startLeaving = useCallback(
		(id: string) => {
			// auto-dismiss 타이머가 있다면 정리
			const existing = timersRef.current.get(id);
			if (existing) {
				window.clearTimeout(existing);
				timersRef.current.delete(id);
			}

			setLeavingIds((prev) => {
				if (prev.has(id)) return prev;
				const next = new Set(prev);
				next.add(id);
				return next;
			});

			// 위로 살짝 + fade-out 애니메이션 후 제거
			window.setTimeout(() => {
				remove(id);
				setLeavingIds((prev) => {
					if (!prev.has(id)) return prev;
					const next = new Set(prev);
					next.delete(id);
					return next;
				});
			}, EXIT_MS);
		},
		[remove]
	);

	useEffect(() => {
		// 최대 MAX_ITEMS 유지: 초과분은 "exit 애니메이션" 후 제거
		if (items.length > MAX_ITEMS) {
			const overflow = items.slice(0, items.length - MAX_ITEMS);
			const overflowIds = overflow.map((x) => x.id);
			window.setTimeout(() => {
				for (const id of overflowIds) startLeaving(id);
			}, 0);
		}

		// duration 후 자동 종료 예약
		for (const item of items) {
			if (!timersRef.current.has(item.id)) {
				const t = window.setTimeout(() => startLeaving(item.id), item.durationMs);
				timersRef.current.set(item.id, t);
			}
		}

		// store에서 이미 제거된 항목의 타이머 정리
		const alive = new Set(items.map((x) => x.id));
		for (const [id, t] of timersRef.current.entries()) {
			if (!alive.has(id)) {
				window.clearTimeout(t);
				timersRef.current.delete(id);
			}
		}
	}, [items, startLeaving]);

	// unmount 시 타이머 정리
	useEffect(() => {
		const timers = timersRef.current;
		return () => {
			for (const t of timers.values()) window.clearTimeout(t);
			timers.clear();
		};
	}, []);

	return { leavingIds, startLeaving } as const;
}

