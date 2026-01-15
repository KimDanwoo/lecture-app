import type { CourseSort } from '@/entities/course/model';

export const courseKeys = {
  all: ['courses'] as const,
  list: (params: { page?: number; size?: number; sort?: CourseSort }) => [...courseKeys.all, 'list', params] as const,
  infinite: (params: { size: number; sort: CourseSort }) => [...courseKeys.all, 'infinite', params] as const,
} as const;
