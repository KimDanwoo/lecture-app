import { http } from '@/shared/api';

import { ENROLLMENT_PATHS } from './enrollmentPaths';

export type EnrollBatchBody = { courseIds: number[] };
export type EnrollBatchResponse = {
  success?: number[];
  failed?: Array<{ courseId?: number; id?: number; message?: string; reason?: string }>;
  [key: string]: unknown;
};

/**
 * @description 수강신청 API
 */
export const enrollmentApi = {
  /**
   * @description 수강신청 API
   * @param courseId - 강의 코스 ID
   * @returns 수강신청 응답
   */
  enrollCourse(courseId: number | string) {
    return http.post<void>(ENROLLMENT_PATHS.COURSE(courseId));
  },

  /**
   * @description 수강신청 배치 API
   * @param body - 수강신청 배치 바디
   * @returns 수강신청 배치 응답
   */
  enrollBatch(body: EnrollBatchBody) {
    return http.post<EnrollBatchResponse>(ENROLLMENT_PATHS.BATCH, body);
  },
} as const;
