import type { CoursePage } from '@/entities/course/api/courseApi';
import { courseApi } from '@/entities/course/api/courseApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CourseSortOptions } from '../types';

export const courseKeys = {
  all: ['courses'] as const,
  infinite: (params: { size: number; sort: CourseSortOptions }) => [...courseKeys.all, 'infinite', params] as const,
} as const;

export function useInfiniteCourses(params: { size: number; sort: CourseSortOptions }) {
  return useInfiniteQuery({
    queryKey: courseKeys.infinite(params),
    initialPageParam: 0,
    queryFn: ({ pageParam }) => courseApi.getCoursesPage({ page: pageParam, size: params.size, sort: params.sort }),
    getNextPageParam: (lastPage: CoursePage) => (lastPage.hasNext ? lastPage.nextPage : undefined),
    staleTime: 30_000,
  });
}
