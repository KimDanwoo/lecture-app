import type { Course } from '@/entities/course/model';

function isCourseFull(course: Course) {
  if (typeof course.isFull === 'boolean') return course.isFull;
  if (typeof course.availableSeats === 'number') return course.availableSeats <= 0;
  return course.currentStudents >= course.maxStudents;
}

export function getFullCourseIdSet(courses: Course[]) {
  const ids: number[] = [];
  for (const course of courses) {
    if (isCourseFull(course)) ids.push(course.id);
  }
  return new Set(ids);
}
