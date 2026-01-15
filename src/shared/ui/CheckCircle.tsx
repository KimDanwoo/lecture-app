'use client';

import { cn } from '@/shared/lib/classnames';

type Props = {
  checked: boolean;
  className?: string;
};

/**
 * @description 체크 원
 * @param checked - 체크 여부
 * @param className - 체크 원 클래스
 * @returns 체크 원
 */
export function CheckCircle({ checked, className = '' }: Props) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid h-5 w-5 shrink-0 place-items-center rounded-full border-2',
        checked
          ? 'border-(--color-primary) bg-white dark:bg-black'
          : 'border-black/20 bg-white dark:border-white/25 dark:bg-black',
        className,
      )}
    >
      {checked && (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13.2 4.8L6.8 11.2L3.8 8.2"
            stroke="var(--color-primary)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}
