'use client';

import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

/**
 * @description 인풋
 * @param label - 인풋 라벨
 * @param className - 인풋 클래스
 * @param props - 인풋 프로퍼티
 * @returns 인풋
 */
export function Input({ label, className = '', ...props }: Props) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
      <input
        {...props}
        className={[
          'h-11 rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-950 outline-none',
          'focus:ring-2 focus:ring-zinc-400/40 ',
          'dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:focus:ring-zinc-200/20',
          className,
        ].join(' ')}
      />
    </label>
  );
}
