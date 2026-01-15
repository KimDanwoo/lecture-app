import type { Course } from '@/entities/course/model';

/**
 * @description 강의 정원 확인
 * @param course - 강의
 * @returns 강의 정원 확인 결과
 */
function isCourseFull(course: Course) {
  if (typeof course.isFull === 'boolean') return course.isFull;
  if (typeof course.availableSeats === 'number') return course.availableSeats <= 0;
  return course.currentStudents >= course.maxStudents;
}

/**
 * @description 강의 정원 확인 세트 가져오기
 * @param courses - 강의 목록
 * @returns 강의 정원 확인 세트
 */
export function getFullCourseIdSet(courses: Course[]) {
  const ids: number[] = [];
  for (const course of courses) {
    if (isCourseFull(course)) ids.push(course.id);
  }
  return new Set(ids);
}
