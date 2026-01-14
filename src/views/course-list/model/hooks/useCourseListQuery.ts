'use client';

import { useInfiniteCourses, type CourseSort } from '@/entities/course/model/hooks';
import type { Course } from '@/entities/course/model/types';
import { dedupeCoursesById } from '@/views/course-list/model/utils';
import { useMemo } from 'react';

export function useCourseListQuery(input: { sort: CourseSort; size: number }) {
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

