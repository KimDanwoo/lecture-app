'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { cn } from '@/shared/lib/classnames';
import { Button, Input, Spacing } from '@/shared/ui';
import { useLoginForm } from '@/views/login/model/hooks';

export function LoginPage() {
  const { values, setField, onSubmit, isPending } = useLoginForm();
  const searchParams = useSearchParams();

  const reason = useMemo(() => searchParams.get('reason'), [searchParams]);
  const showEnrollRequired = reason === 'enroll_required';

  return (
    <section className="mx-auto w-full max-w-md" aria-label="로그인 폼">
      {showEnrollRequired ? (
        <div
          className={cn(
            'mb-4 rounded-x p-4 text-sm text-zinc-700 dark:text-zinc-300 ',
            'border border-black/10 dark:border-white/15',
            'bg-white dark:bg-black',
          )}
        >
          수강 신청을 하려면 <b>로그인</b>이 필요합니다.
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="h-full flex flex-col">
        <div className="flex-1">
          <Input
            label="이메일"
            type="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            placeholder="user@example.com"
            required
          />

          <Spacing size={30} />

          <Input
            label="비밀번호"
            type="password"
            value={values.password}
            onChange={(e) => setField('password', e.target.value)}
            placeholder="Test1234"
            required
          />
        </div>

        <Spacing size={60} />

        <Button type="submit" disabled={isPending}>
          {isPending ? '처리 중...' : '로그인'}
        </Button>
      </form>
    </section>
  );
}
