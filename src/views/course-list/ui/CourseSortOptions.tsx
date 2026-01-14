'use client';

import { SegmentButton } from '@/shared/ui';
import { COURSE_LIST_SORT_OPTIONS } from '@/views/course-list/model/constants';
import { type CourseListSort } from '@/views/course-list/model/types';
import { useRouter } from 'next/navigation';

type Props = {
  currentSort: CourseListSort;
};

export function CourseSortOptions({ currentSort }: Props) {
  const router = useRouter();

  return (
    <div role="tablist" aria-label="정렬 옵션" className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4">
      {COURSE_LIST_SORT_OPTIONS.map((item) => (
        <SegmentButton
          key={item.value}
          label={item.label}
          selected={item.value === currentSort}
          onPress={() => router.push(`/?sort=${item.value}`)}
        />
      ))}
    </div>
  );
}
