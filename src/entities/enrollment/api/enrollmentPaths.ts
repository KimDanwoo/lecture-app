export const ENROLLMENT_PATHS = {
  BATCH: '/api/enrollments/batch',
  COURSE: (courseId: number | string) => `/api/courses/${courseId}/enroll`,
} as const;
