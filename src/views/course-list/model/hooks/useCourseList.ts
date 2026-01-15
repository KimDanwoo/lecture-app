'use client';

import { useMemo } from 'react';

import type { Course, CourseSort } from '@/entities/course/model';
import { useInfiniteCourses } from '@/entities/course/model/services';
import { dedupeCoursesById } from '@/views/course-list/model/utils';

/**
 * @description 강의 목록
 * @param input - 강의 목록 조회 파라미터
 * @returns 강의 목록 조회 결과
 */
export function useCourseList(input: { sort: CourseSort; size: number }) {
  const { sort, size } = input;

  const query = useInfiniteCourses({ size, sort });

  const courses = useMemo(() => {
    const items = (query.data?.pages.flatMap((p) => p.items) ?? []) as Course[];
    return dedupeCoursesById(items);
  }, [query.data]);

  const hasCourses = !query.isPending && !query.isError && courses.length > 0;

  return {
    courses,
    hasCourses,
    isPending: query.isPending,
    isError: query.isError,
    hasNextPage: Boolean(query.hasNextPage),
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  };
}
