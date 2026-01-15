'use client';

import { useEffect, useMemo, useRef } from 'react';

import type { Course, CourseSort } from '@/entities/course/model';
import type { Role } from '@/shared/lib/auth';
import { cn } from '@/shared/lib/classnames';
import { snackbar } from '@/shared/ui';
import {
  useCourseList,
  useCourseSelection,
  useEnrollSelectedCourses,
  useInfiniteScroll,
} from '@/views/course-list/model/hooks';

import { CourseCheckoutBar, CourseListFooter, CourseListItem, CourseListStatus } from './';

const PENDING_ENROLL_STORAGE_KEY = 'lecture_pending_enroll';

function readPendingSelectedIds(): number[] {
  try {
    const raw = sessionStorage.getItem(PENDING_ENROLL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    const ids = (
      parsed && typeof parsed === 'object' && 'selectedIds' in parsed
        ? (parsed as { selectedIds: unknown[] }).selectedIds
        : []
    ) as unknown | unknown[];
    if (!Array.isArray(ids)) return [];
    return ids.filter((x) => typeof x === 'number' && Number.isFinite(x));
  } catch {
    return [];
  }
}

export function CourseList({ role, sort }: { role: Role | null; sort: CourseSort }) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const query = useCourseList({ sort, size: 10 });
  const initialSelectedIds = useMemo(() => readPendingSelectedIds(), []);
  const selection = useCourseSelection(query.courses, initialSelectedIds);
  const showCheckoutSticky = selection.selectedIds.length > 0;
  const enroll = useEnrollSelectedCourses({ role, selectedIds: selection.selectedIds });

  const fullCourseIdSet = useMemo(() => {
    const ids: number[] = [];
    for (const c of query.courses) {
      const isFull = (() => {
        if (typeof c.isFull === 'boolean') return c.isFull;
        if (typeof c.availableSeats === 'number') return c.availableSeats <= 0;
        return c.currentStudents >= c.maxStudents;
      })();
      if (isFull) ids.push(c.id);
    }
    return new Set(ids);
  }, [query.courses]);

  const selectedCourseMap = useMemo(() => {
    const byId = new Map(query.courses.map((c) => [c.id, c]));
    const map: Record<number, Course & { outcome?: { status: 'success' | 'error'; message?: string } }> = {};

    for (const id of selection.selectedIds) {
      const course = byId.get(id);
      if (!course) continue;
      const outcome = enroll.outcomes[id];
      map[id] = outcome ? { ...course, outcome } : course;
    }
    return map;
  }, [enroll.outcomes, query.courses, selection.selectedIds]);

  useEffect(() => {
    // 1회성 복원: 복원 후에는 저장된 값을 지워, 이후 방문/새로고침에 영향을 주지 않게 합니다.
    if (initialSelectedIds.length === 0) return;
    try {
      sessionStorage.removeItem(PENDING_ENROLL_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, [initialSelectedIds.length]);

  useEffect(() => {
    // 목록 갱신으로 정원이 찬 강의가 생기면, 선택 상태에서 자동 제거합니다.
    if (selection.selectedIds.length === 0) return;
    for (const id of selection.selectedIds) {
      if (fullCourseIdSet.has(id)) selection.remove(id);
    }
  }, [fullCourseIdSet, selection]);

  useInfiniteScroll({
    sentinelRef,
    enabled: query.hasCourses,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  });

  const checkoutDisabled =
    enroll.isPending || query.isPending || query.isFetchingNextPage || selection.selectedIds.length === 0;

  useEffect(() => {
    const FIXED_SNACKBAR_OFFSET_PX = 96;

    if (!showCheckoutSticky) {
      snackbar.clearDefaultBottomOffset();
      return;
    }
    snackbar.setDefaultBottomOffset(FIXED_SNACKBAR_OFFSET_PX);
    return () => snackbar.clearDefaultBottomOffset();
  }, [showCheckoutSticky]);

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
