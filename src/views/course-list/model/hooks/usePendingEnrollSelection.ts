'use client';

import { useEffect, useMemo } from 'react';

import { clearPendingEnrollSelection, readPendingEnrollSelection } from '@/views/course-list/model/utils';

export function usePendingEnrollSelection() {
  const initialSelectedIds = useMemo(() => readPendingEnrollSelection(), []);

  useEffect(() => {
    if (initialSelectedIds.length === 0) return;
    clearPendingEnrollSelection();
  }, [initialSelectedIds.length]);

  return { initialSelectedIds };
}
