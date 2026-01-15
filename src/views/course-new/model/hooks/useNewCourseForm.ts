'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCreateCourseMutation } from '@/entities/course/model/services';
import { useUserStore, type UserInfo } from '@/features/auth/model/store';
import { HttpError } from '@/shared/api';
import { useErrorReporter } from '@/shared/lib/error';
import { snackbar } from '@/shared/ui';
import type { NewCourseFormValues } from '@/views/course-new/model/types';

export function useNewCourseForm() {
  const router = useRouter();
  const { reportError } = useErrorReporter();
  const user = useUserStore((s: { user: UserInfo | null }) => s.user);
  const createCourseMutation = useCreateCourseMutation();

  const [values, setValues] = useState<NewCourseFormValues>({
    title: '',
    description: '',
    maxStudents: 30,
    price: 0,
  });

  function setField<K extends keyof NewCourseFormValues>(key: K, value: NewCourseFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user?.name) {
      reportError('강사명 정보를 불러오지 못했습니다. 다시 로그인한 뒤 시도해주세요.');
      return;
    }

    try {
      await createCourseMutation.mutateAsync({
        title: values.title,
        description: values.description || undefined,
        instructorName: user.name,
        maxStudents: Number(values.maxStudents),
        price: Number(values.price),
      });
      snackbar.success('강의가 등록되었습니다.');
      router.push('/');
      router.refresh();
    } catch (err) {
      if (err instanceof HttpError) {
        reportError(err.payload.message ?? '강의 등록에 실패했습니다.');
      } else {
        reportError('네트워크 오류가 발생했습니다.');
      }
    }
  }

  return {
    values,
    setField,
    onSubmit,
    isPending: createCourseMutation.isPending,
  };
}
