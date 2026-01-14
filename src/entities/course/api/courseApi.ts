import { COURSE_API_PATHS } from '@/entities/course/api';
import type { Course, CourseListResponse, CourseSortOptions } from '@/entities/course/model/types';
import { http } from '@/shared/api/http';
import { COURSE_SORT_OPTIONS } from '../model/constants';

export type GetCoursesParams = {
  page?: number;
  size?: number;
  sort?: CourseSortOptions;
};

function normalizeCourses(res: CourseListResponse): Course[] {
  if (Array.isArray(res)) return res;
  return (res.content ?? res.items ?? res.data ?? res.courses ?? []) as Course[];
}

type PageInfo = { page: number; size: number; last: boolean };

function coalesceNumber(...values: Array<number | null | undefined>) {
  for (const v of values) {
    if (typeof v === 'number' && Number.isFinite(v)) return v;
  }
  return undefined;
}

function getPageInfo(res: CourseListResponse): PageInfo {
  if (Array.isArray(res)) {
    return { page: 0, size: res.length, last: true };
  }

  const page = coalesceNumber(res.number, res.pageable?.pageNumber, res.page) ?? 0;
  const size = coalesceNumber(res.size, res.pageable?.pageSize) ?? 10;

  const last =
    typeof res.last === 'boolean' ? res.last : typeof res.totalPages === 'number' ? page >= res.totalPages - 1 : false;

  return { page, size, last };
}

export const courseQueryKeys = {
  all: ['courses'] as const,
  list: (params: GetCoursesParams) => [...courseQueryKeys.all, 'list', params] as const,
  infinite: (params: { size: number; sort: NonNullable<GetCoursesParams['sort']> }) =>
    [...courseQueryKeys.all, 'infinite', params] as const,
};

export type CoursePage = {
  items: Course[];
  page: number;
  size: number;
  hasNext: boolean;
  nextPage?: number;
};

export const courseApi = {
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
