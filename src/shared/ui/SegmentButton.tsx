'use client';

import type { ReactNode } from 'react';

type Props = {
  label: ReactNode;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

export function SegmentButton({ label, selected, onPress, disabled, size = 'sm', className = '' }: Props) {
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
      onClick={onPress}
      className={[
        base,
        selected
          ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950'
          : [
              'bg-white text-zinc-800 ring-1 ring-black/10 hover:bg-zinc-50',
              'dark:bg-black dark:text-zinc-200 dark:ring-white/15 dark:hover:bg-zinc-900',
            ].join(' '),
        disabled ? 'opacity-50' : '',
        className,
      ].join(' ')}
    >
      {label}
    </button>
  );
}

