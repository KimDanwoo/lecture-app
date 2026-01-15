import type { Course } from '@/entities/course/model';

/**
 * @description 강의 목록 중복 제거
 * @param items - 강의 목록
 * @returns 강의 목록 중복 제거 결과
 */
export function dedupeCoursesById(items: Course[]) {
  if (items.length <= 1) return items;
  const seen = new Set<number>();
  const deduped: Course[] = [];
  for (const c of items) {
    if (seen.has(c.id)) continue;
    seen.add(c.id);
    deduped.push(c);
  }
  return deduped;
}
