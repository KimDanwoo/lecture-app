'use client';

import { useSignupMutation } from '@/features/auth/model/services';
import { HttpError } from '@/shared/api/http';
import type { Role } from '@/shared/lib/auth';
import { useErrorReporter } from '@/shared/lib/error';
import { snackbar } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SignupFormValues } from '@/views/signup/model/types';
import { AUTH_ROLES } from '@/entities/auth/model/constants';
import { ROUTES } from '@/shared/config';

export function useSignupForm() {
  const router = useRouter();
  const { reportError } = useErrorReporter();
  const signupMutation = useSignupMutation();

  const [values, setValues] = useState<SignupFormValues>({
    role: AUTH_ROLES.STUDENT,
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
  });

  function setField<K extends keyof SignupFormValues>(key: K, value: SignupFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function setRole(role: Role) {
    setField('role', role);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (values.password !== values.passwordConfirm) {
      reportError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signupMutation.mutateAsync({
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
        role: values.role,
      });
      snackbar.success('회원가입이 완료되었습니다.');
      router.push(ROUTES.LOGIN);
    } catch (err) {
      if (err instanceof HttpError) {
        reportError(err.payload.message);
      } else {
        reportError('네트워크 오류가 발생했습니다.');
      }
    }
  }

  return {
    values,
    setField,
    setRole,
    onSubmit,
    isPending: signupMutation.isPending,
  };
}

