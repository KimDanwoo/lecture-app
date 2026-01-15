'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useLoginMutation } from '@/features/auth/model/services';
import { HttpError } from '@/shared/api';
import { ROUTES } from '@/shared/config';
import { useErrorReporter } from '@/shared/lib/error';
import { snackbar } from '@/shared/ui';
import type { LoginFormValues } from '@/views/login/model/types';

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { reportError } = useErrorReporter();
  const loginMutation = useLoginMutation();

  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' });

  function setField<K extends keyof LoginFormValues>(key: K, value: LoginFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(values);
      snackbar.success('로그인되었습니다.');
      const returnTo = searchParams.get('returnTo');
      router.push(returnTo || ROUTES.HOME);
      router.refresh();
    } catch (err) {
      if (err instanceof HttpError) {
        reportError(err.payload.message ?? '로그인에 실패했습니다.');
      } else {
        reportError('네트워크 오류가 발생했습니다.');
      }
    }
  }

  return {
    values,
    setField,
    onSubmit,
    isPending: loginMutation.isPending,
  };
}
