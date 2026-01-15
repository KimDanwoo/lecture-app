import { Course, CourseListResponse, CoursePageInfo } from '@/entities/course/model/types';

/**
 * @description 코스 목록 정규화
 * @param res - 코스 목록
 * @returns 코스 목록
 */
export function normalizeCourses(res: CourseListResponse): Course[] {
  if (Array.isArray(res)) return res;
  return (res.content ?? res.items ?? res.data ?? res.courses ?? []) as Course[];
}

/**
 * @description 숫자 조합
 * @param values - 숫자 배열
 * @returns 숫자
 */
export function coalesceNumber(...values: Array<number | null | undefined>) {
  for (const v of values) {
    if (typeof v === 'number' && Number.isFinite(v)) return v;
  }
  return undefined;
}

/**
 * @description 페이지 정보 조회
 * @param res - 코스 목록
 * @returns 페이지 정보
 */
export function getPageInfo(res: CourseListResponse): CoursePageInfo {
  if (Array.isArray(res)) {
    return { page: 0, size: res.length, last: true };
  }

  const page = coalesceNumber(res.number, res.pageable?.pageNumber, res.page) ?? 0;
  const size = coalesceNumber(res.size, res.pageable?.pageSize) ?? 10;

  const last = Boolean(res.last ?? (typeof res.totalPages === 'number' ? page >= res.totalPages - 1 : undefined));

  return { page, size, last };
}
