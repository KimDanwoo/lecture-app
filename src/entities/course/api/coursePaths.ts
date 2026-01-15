export const COURSE_API_PATHS = {
  LIST: '/api/courses',
  ENROLL: (courseId: number | string) => `/api/courses/${courseId}/enroll`,
} as const;
