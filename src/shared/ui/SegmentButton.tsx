'use client';

import type { ReactNode } from 'react';

type Props = {
  label: ReactNode;
  selected: boolean;
  onPressAction: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

/**
 * @description 세그먼트 버튼
 * @param label - 세그먼트 버튼 라벨
 * @param selected - 세그먼트 버튼 선택 여부
 * @param onPressAction - 세그먼트 버튼 클릭 액션
 * @param disabled - 세그먼트 버튼 비활성화 여부
 * @param size - 세그먼트 버튼 크기
 * @param className - 세그먼트 버튼 클래스
 * @returns 세그먼트 버튼
 */
export function SegmentButton({ label, selected, onPressAction, disabled, size = 'sm', className = '' }: Props) {
  const base =
    size === 'md'
      ? 'rounded-full px-3 py-1.5 text-sm font-semibold'
      : 'rounded-full px-2.5 py-1 text-xs font-semibold sm:px-3 sm:py-1.5 sm:text-sm';

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      onClick={onPressAction}
      className={[
        base,
        selected ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-800 ring-1 ring-black/10 hover:bg-zinc-50',
        'dark:bg-black dark:text-zinc-200 dark:ring-white/15 dark:hover:bg-zinc-900',
        disabled ? 'opacity-50' : '',
        className,
      ].join(' ')}
    >
      {label}
    </button>
  );
}
