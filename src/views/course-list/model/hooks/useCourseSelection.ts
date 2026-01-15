'use client';

import { useMemo, useState } from 'react';

import type { Course } from '@/entities/course/model';

/**
 * @description 강의 선택
 * @param courses - 강의 목록
 * @param initialSelectedIds - 초기 선택된 강의 ID 목록
 * @returns 강의 선택 결과
 */
export function useCourseSelection(courses: Course[], initialSelectedIds: number[] = []) {
  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelectedIds);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  function toggle(id: number) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  }

  function remove(id: number) {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }

  function clear() {
    setSelectedIds([]);
  }

  const totalPrice = useMemo(() => {
    if (selectedIds.length === 0) return 0;
    const byId = new Map(courses.map((c) => [c.id, c]));
    return selectedIds.reduce((sum, id) => sum + (byId.get(id)?.price ?? 0), 0);
  }, [courses, selectedIds]);

  return {
    selectedIds,
    selectedSet,
    totalPrice,
    toggle,
    remove,
    clear,
  };
}
