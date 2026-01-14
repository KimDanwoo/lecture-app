import type { Course } from '@/entities/course/model/types';

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

