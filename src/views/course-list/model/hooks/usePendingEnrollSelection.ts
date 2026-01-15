'use client';

import { useEffect, useMemo } from 'react';

import { clearPendingEnrollSelection, readPendingEnrollSelection } from '@/views/course-list/model/utils';

/**
 * @description 수강신청 선택 목록
 * @returns 수강신청 선택 목록
 */
export function usePendingEnrollSelection() {
  const initialSelectedIds = useMemo(() => readPendingEnrollSelection(), []);

  useEffect(() => {
    if (initialSelectedIds.length === 0) return;
    clearPendingEnrollSelection();
  }, [initialSelectedIds.length]);

  return { initialSelectedIds };
}
