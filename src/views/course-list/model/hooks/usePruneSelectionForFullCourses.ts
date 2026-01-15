'use client';

import { useEffect } from 'react';

/**
 * @description 선택된 강의 코스 제거
 * @param input - 선택된 강의 코스 제거 파라미터
 * @returns void
 */
export function usePruneSelectionForFullCourses(input: {
  selectedIds: number[];
  fullCourseIdSet: Set<number>;
  removeAction: (id: number) => void;
}) {
  const { selectedIds, fullCourseIdSet, removeAction } = input;

  useEffect(() => {
    if (selectedIds.length === 0) return;
    for (const id of selectedIds) {
      if (fullCourseIdSet.has(id)) removeAction(id);
    }
  }, [fullCourseIdSet, removeAction, selectedIds]);
}
