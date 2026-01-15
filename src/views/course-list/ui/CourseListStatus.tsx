'use client';

import { useMemo } from 'react';

import { cn } from '@/shared/lib/classnames';

type Props = {
  isPending: boolean;
  isError: boolean;
  isEmpty: boolean;
};

const STATUS_MESSAGES = {
  PENDING: '강의 목록을 불러오는 중...',
  ERROR: '강의 목록을 불러오지 못했어요.',
  EMPTY: '아직 표시할 강의가 없습니다.',
};

export function CourseListStatus({ isPending, isError, isEmpty }: Props) {
  const message = useMemo(() => {
    if (isPending) return STATUS_MESSAGES.PENDING;
    if (isError) return STATUS_MESSAGES.ERROR;
    if (isEmpty) return STATUS_MESSAGES.EMPTY;
    return null;
  }, [isPending, isError, isEmpty]);

  if (!message) return null;

  return (
    <div
      className={cn(
        'rounded-xl border ',
        'border-black/10 bg-white p-6 text-sm text-zinc-600 dark:border-white/15 dark:bg-black dark:text-zinc-400',
      )}
    >
      {message}
    </div>
  );
}
