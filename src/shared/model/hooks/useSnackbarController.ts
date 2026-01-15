'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { SnackbarItem } from '@/shared/model/store';

const MAX_ITEMS = 6;
const EXIT_MS = 200;

/**
 *  @description Snackbar 리스트의 lifecycle(자동 종료, max 개수 제한, exit 애니메이션 상태)을 관리합니다.
 *  @param items - Snackbar 리스트
 *  @param remove - Snackbar 제거 함수
 *  @returns { leavingIds, startLeaving }
 */
export function useSnackbarController(items: SnackbarItem[], remove: (id: string) => void) {
  const [leavingIds, setLeavingIds] = useState<Set<string>>(() => new Set());
  const timersRef = useRef<Map<string, number>>(new Map());

  const startLeaving = useCallback(
    (id: string) => {
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
    [remove],
  );

  useEffect(() => {
    if (items.length > MAX_ITEMS) {
      const overflow = items.slice(0, items.length - MAX_ITEMS);
      const overflowIds = overflow.map((x) => x.id);
      window.setTimeout(() => {
        for (const id of overflowIds) startLeaving(id);
      }, 0);
    }

    for (const item of items) {
      if (!timersRef.current.has(item.id)) {
        const t = window.setTimeout(() => startLeaving(item.id), item.durationMs);
        timersRef.current.set(item.id, t);
      }
    }

    const alive = new Set(items.map((x) => x.id));
    for (const [id, t] of timersRef.current.entries()) {
      if (!alive.has(id)) {
        window.clearTimeout(t);
        timersRef.current.delete(id);
      }
    }
  }, [items, startLeaving]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      for (const t of timers.values()) window.clearTimeout(t);
      timers.clear();
    };
  }, []);

  return { leavingIds, startLeaving } as const;
}
