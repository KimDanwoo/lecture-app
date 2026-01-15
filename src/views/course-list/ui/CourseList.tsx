'use client';

import { useMemo, useRef } from 'react';

import type { CourseSort } from '@/entities/course/model';
import type { Role } from '@/shared/lib/auth';
import { cn } from '@/shared/lib/classnames';
import { COURSE_LIST_PAGE_SIZE } from '@/views/course-list/model/constants';
import {
  useCheckoutSnackbarOffset,
  useCourseList,
  useCourseSelection,
  useEnrollSelectedCourses,
  useInfiniteScroll,
  usePendingEnrollSelection,
  usePruneSelectionForFullCourses,
  useSelectedCourseMap,
} from '@/views/course-list/model/hooks';
import { getFullCourseIdSet } from '@/views/course-list/model/utils';

import { CourseCheckoutBar, CourseListFooter, CourseListItem, CourseListStatus } from './';

export function CourseList({ role, sort }: { role: Role | null; sort: CourseSort }) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const query = useCourseList({ sort, size: COURSE_LIST_PAGE_SIZE });
  const { initialSelectedIds } = usePendingEnrollSelection();
  const selection = useCourseSelection(query.courses, initialSelectedIds);
  const showCheckoutSticky = selection.selectedIds.length > 0;
  const enroll = useEnrollSelectedCourses({ role, selectedIds: selection.selectedIds });

  const fullCourseIdSet = useMemo(() => getFullCourseIdSet(query.courses), [query.courses]);
  const selectedCourseMap = useSelectedCourseMap({
    courses: query.courses,
    selectedIds: selection.selectedIds,
    outcomes: enroll.outcomes,
  });

  usePruneSelectionForFullCourses({
    selectedIds: selection.selectedIds,
    fullCourseIdSet,
    removeAction: selection.remove,
  });

  useInfiniteScroll({
    sentinelRef,
    enabled: query.hasCourses,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPageAction: query.fetchNextPage,
  });

  useCheckoutSnackbarOffset(showCheckoutSticky);

  const checkoutDisabled =
    enroll.isPending || query.isPending || query.isFetchingNextPage || selection.selectedIds.length === 0;

  return (
    <div className={cn('grid gap-4', showCheckoutSticky && 'pb-24 sm:pb-28')}>
      <CourseListStatus
        isPending={query.isPending}
        isError={query.isError}
        isEmpty={!query.isPending && !query.isError && query.courses.length === 0}
      />

      {query.hasCourses && (
        <>
          <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {query.courses.map((course) => {
              const isFull = fullCourseIdSet.has(course.id);
              const onToggle = isFull ? undefined : () => selection.toggle(course.id);

              return (
                <CourseListItem
                  key={course.id}
                  course={course}
                  checked={selection.selectedSet.has(course.id)}
                  disabled={isFull}
                  onToggleAction={onToggle}
                />
              );
            })}
          </div>

          <CourseListFooter
            hasNextPage={query.hasNextPage}
            isFetchingNextPage={query.isFetchingNextPage}
            sentinelRef={sentinelRef}
          />

          {showCheckoutSticky && (
            <CourseCheckoutBar
              totalPrice={selection.totalPrice}
              message={enroll.message}
              selectedCount={selection.selectedIds.length}
              selectedOrder={selection.selectedIds}
              selectedCourseMap={selectedCourseMap}
              onRemoveCourseAction={selection.remove}
              onClearSelectionAction={selection.clear}
              onClearFeedbackAction={enroll.clearFeedback}
              disabled={checkoutDisabled}
              isSubmitting={enroll.isPending}
              onEnrollAction={enroll.enroll}
            />
          )}
        </>
      )}
    </div>
  );
}
