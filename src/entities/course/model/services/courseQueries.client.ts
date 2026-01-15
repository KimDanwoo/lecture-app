'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { courseApi } from '@/entities/course/api';
import type { CoursePage, CourseSort } from '@/entities/course/model';
import { courseKeys } from '@/entities/course/model/services';

/**
 * @description 강의 코스 무한 스크롤 조회
 */
export function useInfiniteCourses(input: { size: number; sort: CourseSort }) {
  const { size, sort } = input;

  return useInfiniteQuery({
    queryKey: courseKeys.infinite({ size, sort }),
    initialPageParam: 0,
    queryFn: ({ pageParam }) => courseApi.getCoursesPage({ page: pageParam, size, sort }),
    getNextPageParam: (lastPage: CoursePage) => (lastPage.hasNext ? lastPage.nextPage : undefined),
  });
}
