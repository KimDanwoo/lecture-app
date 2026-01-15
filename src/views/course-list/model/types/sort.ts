import { COURSE_SORT_OPTIONS } from '@/entities/course/model/constants';
import type { CourseSortOptions } from '@/entities/course/model';

export type CourseListSort = CourseSortOptions;

export function toCourseListSort(value: string | undefined): CourseSortOptions {
  if (
    value === COURSE_SORT_OPTIONS.POPULAR ||
    value === COURSE_SORT_OPTIONS.RATE ||
    value === COURSE_SORT_OPTIONS.RECENT
  )
    return value;
  return COURSE_SORT_OPTIONS.RECENT;
}
