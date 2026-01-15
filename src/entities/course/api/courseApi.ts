import { COURSE_API_PATHS } from '@/entities/course/api';
import type { CourseListResponse, CoursePage, GetCoursesParams } from '@/entities/course/model';
import { COURSE_SORT_OPTIONS } from '@/entities/course/model/constants';
import { getPageInfo, normalizeCourses } from '@/entities/course/model/utils';
import { http } from '@/shared/api';

/**
 * @description 강의 코스 API
 */
export const courseApi = {
  /**
   * @description 코스 목록 조회
   * @param params - 조회 파라미터
   * @returns 코스 목록
   */
  async getCourses(params: GetCoursesParams = {}) {
    const page = params.page ?? 0;
    const size = params.size ?? 10;
    const sort = params.sort ?? COURSE_SORT_OPTIONS.RECENT;

    const qs = new URLSearchParams({
      page: String(page),
      size: String(size),
      sort,
    });

    const res = await http.get<CourseListResponse>(`${COURSE_API_PATHS.LIST}?${qs.toString()}`, {
      cache: 'no-store',
    });

    return normalizeCourses(res);
  },

  /**
   * @description 코스 목록 페이지 조회
   * @param params - 조회 파라미터
   * @returns 코스 목록 페이지
   */
  async getCoursesPage(params: GetCoursesParams = {}): Promise<CoursePage> {
    const page = params.page ?? 0;
    const size = params.size ?? 10;
    const sort = params.sort ?? COURSE_SORT_OPTIONS.RECENT;

    const qs = new URLSearchParams({
      page: String(page),
      size: String(size),
      sort,
    });

    const res = await http.get<CourseListResponse>(`${COURSE_API_PATHS.LIST}?${qs.toString()}`, {
      cache: 'no-store',
    });

    const items = normalizeCourses(res);
    const info = getPageInfo(res);
    const hasNext = !info.last;

    return {
      items,
      page: info.page,
      size: info.size,
      hasNext,
      nextPage: hasNext ? info.page + 1 : undefined,
    };
  },

  /**
   * @description 코스 생성
   * @param body - 코스 생성 요청 바디
   * @returns 코스 생성 결과
   */
  createCourse(body: {
    title: string;
    description?: string;
    instructorName?: string;
    maxStudents: number;
    price: number;
  }) {
    return http.post<unknown>(COURSE_API_PATHS.LIST, body);
  },
} as const;
