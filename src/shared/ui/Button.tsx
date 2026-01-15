'use client';

import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

/**
 * @description 버튼
 * @param className - 버튼 클래스
 * @param disabled - 버튼 비활성화 여부
 * @param props - 버튼 프로퍼티
 * @returns 버튼
 */
export function Button({ className = '', disabled, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={[
        'inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold',
        'bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-zinc-950',
        'dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white',
        className,
      ].join(' ')}
    />
  );
}
