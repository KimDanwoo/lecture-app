export const COURSE_SORT_OPTIONS = {
  RECENT: 'recent',
  POPULAR: 'popular',
  RATE: 'rate',
} as const;

export type CourseSortOptions = (typeof COURSE_SORT_OPTIONS)[keyof typeof COURSE_SORT_OPTIONS];
