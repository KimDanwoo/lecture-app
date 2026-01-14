'use client';

import { cn } from '@/shared/lib/classnames';

type Variant = 'primary' | 'error';

type Props = {
  label: string;
  variant: Variant;
  className?: string;
};

export function Badge({ label, variant, className = '' }: Props) {
  const base = 'shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold';

  const variantClass =
    variant === 'primary'
      ? 'bg-(--color-primary)/15 text-(--color-primary)'
      : 'bg-red-500/10 text-red-600 dark:text-red-400';

  return <span className={cn(base, variantClass, className)}>{label}</span>;
}

