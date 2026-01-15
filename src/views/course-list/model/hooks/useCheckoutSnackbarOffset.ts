'use client';

import { useEffect } from 'react';

import { snackbar } from '@/shared/ui';
import { CHECKOUT_SNACKBAR_OFFSET_PX } from '@/views/course-list/model/constants';

/**
 * @description 수강신청 스낵바 오프셋 설정
 * @param enabled - 수강신청 스낵바 오프셋 설정 여부
 * @returns void
 */
export function useCheckoutSnackbarOffset(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      snackbar.clearDefaultBottomOffset();
      return;
    }
    snackbar.setDefaultBottomOffset(CHECKOUT_SNACKBAR_OFFSET_PX);
    return () => snackbar.clearDefaultBottomOffset();
  }, [enabled]);
}
