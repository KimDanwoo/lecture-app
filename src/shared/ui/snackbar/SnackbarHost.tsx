'use client';

import { useSnackbarController } from '@/shared/model/hooks';
import { useSnackbarStore, type SnackbarVariant } from '@/shared/model/store';
import Styles from './SnackbarHost.module.scss';

function variantClass(variant: SnackbarVariant) {
  if (variant === 'success') {
    return Styles['snackbar--success'];
  }
  if (variant === 'error') {
    return Styles['snackbar--error'];
  }
  return '';
}

export function SnackbarHost() {
  const items = useSnackbarStore((s) => s.items);
  const defaultBottomOffset = useSnackbarStore((s) => s.defaultBottomOffset);
  const remove = useSnackbarStore((s) => s.remove);
  const { leavingIds, startLeaving } = useSnackbarController(items, remove);

  if (items.length === 0) return null;

  const bottomOffset = items.reduce((acc, item) => {
    const v = item.bottomOffset;
    if (typeof v === 'number' && Number.isFinite(v)) return Math.max(acc, v);
    return acc;
  }, 0);
  const effectiveBottomOffset = Math.max(bottomOffset, defaultBottomOffset ?? 0);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={Styles.snackbarHost}
      style={
        effectiveBottomOffset > 0
          ? ({ ['--snackbar-bottom-offset' as any]: `${effectiveBottomOffset}px` } as any)
          : undefined
      }
    >
      <div className={Styles.snackbarHost__stack}>
        {items.map((item) => (
          <div key={item.id} className={Styles.snackbarHost__item}>
            <div
              className={[
                Styles.snackbar,
                variantClass(item.variant),
                leavingIds.has(item.id) ? Styles['snackbar--leave'] : Styles['snackbar--enter'],
              ].join(' ')}
            >
              <div className={Styles.snackbar__content}>{item.message}</div>
              <div className={Styles.snackbar__actions}>
                <button
                  type="button"
                  aria-label="닫기"
                  onClick={() => startLeaving(item.id)}
                  className={Styles.snackbar__close}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
