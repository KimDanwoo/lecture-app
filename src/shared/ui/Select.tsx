'use client';

import type { SelectHTMLAttributes } from 'react';

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

/**
 * @description 셀렉트
 * @param label - 셀렉트 라벨
 * @param className - 셀렉트 클래스
 * @param children - 셀렉트 하위 컴포넌트
 * @param props - 셀렉트 프로퍼티
 * @returns 셀렉트
 */
export function Select({ label, className = '', children, ...props }: Props) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
      <select
        {...props}
        className={[
          'h-11 rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-950 outline-none',
          'focus:ring-2 focus:ring-zinc-400/40 ',
          'dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:focus:ring-zinc-200/20',
          className,
        ].join(' ')}
      >
        {children}
      </select>
    </label>
  );
}
