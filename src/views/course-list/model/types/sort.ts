import type { CourseSortOptions } from '@/entities/course/model';
import { COURSE_SORT_OPTIONS } from '@/entities/course/model/constants';

export type CourseListSort = CourseSortOptions;

/**
 * @description 강의 목록 정렬 타입 변환
 * @param value - 강의 목록 정렬 타입
 * @returns 강의 목록 정렬 타입
 */
export function toCourseListSort(value: string | undefined): CourseSortOptions {
  if (
    value === COURSE_SORT_OPTIONS.POPULAR ||
    value === COURSE_SORT_OPTIONS.RATE ||
    value === COURSE_SORT_OPTIONS.RECENT
  )
    return value;
  return COURSE_SORT_OPTIONS.RECENT;
}
