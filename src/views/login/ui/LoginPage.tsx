'use client';

import { Button, Input } from '@/shared/ui';
import { useLoginForm } from '@/views/login/model/hooks';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function LoginPage() {
  const { values, setField, onSubmit, isPending } = useLoginForm();
  const searchParams = useSearchParams();

  const reason = useMemo(() => searchParams.get('reason'), [searchParams]);
  const showEnrollRequired = reason === 'enroll_required';

  return (
    <section className="mx-auto w-full max-w-md" aria-label="로그인 폼">
      {showEnrollRequired ? (
        <div className="mb-4 rounded-xl border border-black/10 bg-white p-4 text-sm text-zinc-700 dark:border-white/15 dark:bg-black dark:text-zinc-300">
          수강 신청을 하려면 <b>로그인</b>이 필요합니다.
        </div>
      ) : null}
      <form onSubmit={onSubmit} className="grid gap-4">
        <Input
            label="이메일"
            type="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            placeholder="user@example.com"
            required
          />
        <Input
            label="비밀번호"
            type="password"
            value={values.password}
            onChange={(e) => setField('password', e.target.value)}
            placeholder="Test1234"
            required
          />

        <Button type="submit" disabled={isPending}>
          {isPending ? '처리 중...' : '로그인'}
        </Button>
      </form>
    </section>
  );
}
