'use client';

import { useEffect } from 'react';

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
