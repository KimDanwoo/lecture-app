'use client';

import { useEnrollBatchMutation } from '@/entities/enrollment/model/hooks';
import { HttpError } from '@/shared/api/http';
import { ROUTES } from '@/shared/config';
import type { Role } from '@/shared/lib/auth';
import { snackbar } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PENDING_ENROLL_STORAGE_KEY = 'lecture_pending_enroll';

type EnrollOutcome = {
  status: 'success' | 'error';
  message?: string;
};

export function useEnrollSelectedCourses(input: { role: Role | null; selectedIds: number[] }) {
  const { role, selectedIds } = input;
  const router = useRouter();

  const [message, setMessage] = useState<string | null>(null);
  const [outcomes, setOutcomes] = useState<Record<number, EnrollOutcome>>({});
  const enrollMutation = useEnrollBatchMutation();

  function clearFeedback() {
    setMessage(null);
    setOutcomes({});
  }

  async function enroll() {
    if (!role) {
      // 로그인 후에도 선택 상태를 복원하기 위해, 신청 시점의 선택값을 1회성으로 저장합니다.
      try {
        sessionStorage.setItem(PENDING_ENROLL_STORAGE_KEY, JSON.stringify({ selectedIds }));
      } catch {
        // ignore
      }

      const returnTo = typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : ROUTES.HOME;
      const qs = new URLSearchParams({ reason: 'enroll_required', returnTo });
      router.push(`${ROUTES.LOGIN}?${qs.toString()}`);
      return;
    }
    if (selectedIds.length === 0) {
      setMessage('강의를 하나 이상 선택해주세요.');
      return;
    }

    setMessage(null);
    setOutcomes({});

    try {
      const result = await enrollMutation.mutateAsync({ courseIds: selectedIds });

      const successCount = Array.isArray(result?.success) ? result.success.length : 0;
      const failedCount = Array.isArray(result?.failed) ? result.failed.length : 0;

      const nextOutcomes: Record<number, EnrollOutcome> = {};

      if (Array.isArray(result?.success)) {
        for (const id of result.success) {
          if (typeof id === 'number' && Number.isFinite(id)) nextOutcomes[id] = { status: 'success' };
        }
      }

      if (Array.isArray(result?.failed)) {
        for (const item of result.failed) {
          const id = (item?.courseId ?? item?.id) as unknown;
          if (typeof id !== 'number' || !Number.isFinite(id)) continue;
          const detail =
            typeof item?.message === 'string'
              ? item.message
              : typeof item?.reason === 'string'
                ? item.reason
                : '신청에 실패했습니다.';
          nextOutcomes[id] = { status: 'error', message: detail };
        }
      }

      setOutcomes(nextOutcomes);

      if (failedCount > 0) {
        setMessage(`부분 성공: 성공 ${successCount}건, 실패 ${failedCount}건`);
        snackbar.success(`수강 신청 처리됨 (성공 ${successCount}건, 실패 ${failedCount}건)`);
      } else {
        setMessage(`수강 신청 완료 (${successCount}건)`);
        snackbar.success(`수강 신청 완료 (${successCount}건)`);
      }
    } catch (err) {
      if (err instanceof HttpError) {
        const msg = err.payload.message ?? '수강 신청에 실패했습니다.';
        snackbar.error(msg);
        setMessage(msg);
      } else {
        snackbar.error('네트워크 오류가 발생했습니다.');
        setMessage('네트워크 오류가 발생했습니다.');
      }
      setOutcomes({});
    }
  }

  return {
    message,
    outcomes,
    clearFeedback,
    enroll,
    isPending: enrollMutation.isPending,
  };
}
