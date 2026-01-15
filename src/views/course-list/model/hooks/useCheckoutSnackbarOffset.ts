'use client';

import { useEffect } from 'react';

import { snackbar } from '@/shared/ui';
import { CHECKOUT_SNACKBAR_OFFSET_PX } from '@/views/course-list/model/constants';

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
