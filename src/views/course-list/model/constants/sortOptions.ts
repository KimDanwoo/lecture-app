import { COURSE_SORT_OPTIONS } from '@/entities/course/model/constants';
import type { CourseListSort } from '@/views/course-list/model/types';

// 강의 목록 정렬 옵션
export const COURSE_LIST_SORT_OPTIONS: ReadonlyArray<{ value: CourseListSort; label: string }> = [
  { value: COURSE_SORT_OPTIONS.RECENT, label: '최근 등록순' },
  { value: COURSE_SORT_OPTIONS.POPULAR, label: '신청자 많은순' },
  { value: COURSE_SORT_OPTIONS.RATE, label: '신청률 높은순' },
] as const;
