'use client';

import type { Course } from '@/entities/course/model/types';
import { cn } from '@/shared/lib/classnames';
import { CheckCircle } from '@/shared/ui';
import { formatPrice } from '@/views/course-list/model/utils';

type Props = {
  course: Course;
  onToggleAction?: () => void;
  checked?: boolean;
  disabled?: boolean;
};

export function CourseListItem({ course, onToggleAction, checked, disabled }: Props) {
  const selectable = Boolean(onToggleAction) && !disabled;
  const isChecked = Boolean(checked);
  const Tag = selectable ? 'label' : 'article';

  return (
    <Tag
      className={cn(
        'grid gap-3 rounded-xl border-2 bg-white p-4 shadow-sm dark:bg-black sm:p-5',
        selectable ? 'cursor-pointer' : disabled ? 'opacity-60' : '',
        disabled && 'cursor-not-allowed',
        isChecked ? 'border-(--color-primary)' : 'border-black/10 dark:border-white/15',
      )}
      aria-disabled={disabled ? true : undefined}
    >
      {selectable && (
        <input
          type="checkbox"
          name={`selectedCourse-${course.id}`}
          checked={isChecked}
          onChange={onToggleAction}
          className="sr-only"
          aria-label={`${course.title} 선택`}
        />
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {selectable ? <CheckCircle checked={isChecked} /> : null}
          <div className="min-w-0">
            <h3 className="h-5 truncate text-sm font-semibold leading-5 text-zinc-950 dark:text-zinc-50 sm:h-6 sm:text-base sm:leading-6">
              {course.title}
            </h3>
            <div className="mt-1 truncate text-xs text-zinc-600 dark:text-zinc-400">
              강사명: {course.instructorName}
            </div>
            {disabled ? (
              <div className="mt-1 text-[11px] font-medium text-red-600/90 dark:text-red-400/90">마감</div>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-xs font-semibold text-zinc-950 dark:text-zinc-50 sm:text-sm">
            {formatPrice(course.price)}원
          </div>
          <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {course.currentStudents}/{course.maxStudents}
          </div>
        </div>
      </div>
    </Tag>
  );
}
