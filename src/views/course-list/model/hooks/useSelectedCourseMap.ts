'use client';

import { useMemo } from 'react';

import type { Course } from '@/entities/course/model';

type EnrollOutcome = {
  status: 'success' | 'error';
  message?: string;
};

type SelectedCourseMap = Record<number, Course & { outcome?: EnrollOutcome }>;

export function useSelectedCourseMap(input: {
  courses: Course[];
  selectedIds: number[];
  outcomes: Record<number, EnrollOutcome>;
}) {
  const { courses, selectedIds, outcomes } = input;

  return useMemo(() => {
    const byId = new Map(courses.map((course) => [course.id, course]));
    const map: SelectedCourseMap = {};

    for (const id of selectedIds) {
      const course = byId.get(id);
      if (!course) continue;
      const outcome = outcomes[id];
      map[id] = outcome ? { ...course, outcome } : course;
    }
    return map;
  }, [courses, outcomes, selectedIds]);
}
