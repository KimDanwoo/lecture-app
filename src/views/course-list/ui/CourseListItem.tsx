'use client';

import type { Course } from '@/entities/course/model';
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
        'relative flex h-full flex-col gap-4 rounded-xl border-2 bg-white p-6 shadow-sm dark:bg-black',
        'min-h-[144px] sm:min-h-[168px] lg:min-h-[184px]',
        selectable && 'cursor-pointer',
        disabled && 'opacity-60 cursor-not-allowed',
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

      {selectable ? (
        <div className="absolute right-2 top-2">
          <CheckCircle checked={isChecked} className="h-3 w-3" />
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-3">
        <div className="min-w-0 pr-6">
          <h3
            className={cn(
              'line-clamp-2 text-sm font-semibold leading-5 sm:text-base sm:leading-6 lg:text-[15px]',
              'text-zinc-950 dark:text-zinc-50 ',
            )}
          >
            {course.title}
          </h3>
          <div className="mt-1 truncate text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
            강사명: {course.instructorName}
          </div>
          {disabled ? (
            <div className="mt-1 text-[11px] font-medium text-red-600/90 dark:text-red-400/90">마감</div>
          ) : null}
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
            현재 수강생 {course.currentStudents}명 / 정원 {course.maxStudents}명
          </div>
          <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 sm:text-base">
            {formatPrice(course.price)}원
          </div>
        </div>
      </div>
    </Tag>
  );
}
