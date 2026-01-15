'use client';

import { useMemo, useState } from 'react';

import { cn } from '@/shared/lib/classnames';
import { Badge, Button } from '@/shared/ui';
import { formatPrice } from '@/views/course-list/model/utils';

type SelectedCourse = {
  id: number;
  title: string;
  price: number;
};

type EnrollOutcome = {
  status: 'success' | 'error';
  message?: string;
};

type Props = {
  totalPrice: number;
  message: string | null;
  selectedCount: number;
  selectedOrder: number[];
  selectedCourseMap: Record<number, SelectedCourse & { outcome?: EnrollOutcome }>;
  onRemoveCourseAction: (id: number) => void;
  onClearSelectionAction: () => void;
  onClearFeedbackAction: () => void;
  disabled: boolean;
  isSubmitting: boolean;
  onEnrollAction: () => void;
};

export function CourseCheckoutBar({
  totalPrice,
  message,
  selectedCount,
  selectedOrder,
  selectedCourseMap,
  onRemoveCourseAction,
  onClearSelectionAction,
  onClearFeedbackAction,
  disabled,
  isSubmitting,
  onEnrollAction,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const selectedCourses = useMemo(
    () => selectedOrder.map((id) => selectedCourseMap[id]).filter(Boolean),
    [selectedCourseMap, selectedOrder],
  );

  const selectionSummary = useMemo(() => {
    if (selectedCount === 0) return null;
    const titles = selectedCourses.map((c) => c.title).filter(Boolean);
    const shown = titles.slice(0, 2);
    const rest = Math.max(selectedCount - shown.length, 0);
    if (shown.length === 0) return `${selectedCount}개 선택됨`;
    return rest > 0 ? `${shown.join(', ')} (외 ${rest}건)` : shown.join(', ');
  }, [selectedCourses, selectedCount]);

  const helpMessage = selectedCount === 0 ? '강의를 체크해서 선택한 뒤 수강 신청을 눌러주세요.' : selectionSummary;

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-0 z-40',
        'bg-zinc-50/95 pb-safe backdrop-blur-sm dark:bg-black/80',
      )}
    >
      <div className="w-full px-4 py-3 sm:px-6 sm:py-4">
        <div
          className={cn(
            'pointer-events-auto rounded-2xl ',
            'border border-black/10 bg-white p-3 shadow-sm dark:border-white/15 dark:bg-black sm:p-4',
          )}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                <span className="block">총 금액</span>
                <span className="block text-base sm:text-lg">{formatPrice(totalPrice)}원</span>
              </div>
              {selectedCount > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setExpanded(false);
                    onClearSelectionAction();
                    onClearFeedbackAction();
                  }}
                  className={cn(
                    'shrink-0 rounded-lg px-2 py-1 text-xs font-medium',
                    'text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10',
                  )}
                  aria-label="선택한 강의 초기화"
                >
                  초기화
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <span>{message ?? helpMessage}</span>
              {selectedCount > 0 ? (
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="underline underline-offset-2"
                  aria-expanded={expanded}
                  aria-controls="checkout-selected-courses"
                >
                  {expanded ? '접기' : '더보기'}
                </button>
              ) : null}
            </div>

            {selectedCount > 0 && expanded ? (
              <div
                id="checkout-selected-courses"
                className={cn(
                  'grid max-h-40 gap-2 overflow-auto rounded-xl',
                  'bg-zinc-50 p-3 text-xs text-zinc-700 dark:bg-white/5 dark:text-zinc-200',
                  'border border-black/5 dark:border-white/10',
                )}
              >
                {selectedCourses.map((c) => {
                  const outcome = c.outcome;
                  let badge = null;
                  if (outcome?.status === 'success') {
                    badge = <Badge label="성공" variant="primary" />;
                  } else if (outcome?.status === 'error') {
                    badge = <Badge label="실패" variant="error" />;
                  }

                  return (
                    <div key={c.id} className="flex flex-col gap-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1 truncate">
                          {c.title}
                          {outcome?.status === 'error' && outcome.message && (
                            <span className="text-[11px] text-red-600/90 dark:text-red-400/90">
                              {` (${outcome.message})`}
                            </span>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <div className="font-medium">{formatPrice(c.price)}원</div>
                          {badge}
                          <button
                            type="button"
                            onClick={() => onRemoveCourseAction(c.id)}
                            className={cn(
                              'rounded-md px-1.5 py-1 text-[11px] font-semibold',
                              'text-zinc-700 hover:bg-black/5 dark:text-zinc-200 dark:hover:bg-white/10',
                            )}
                            aria-label={`${c.title} 선택 해제`}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            <Button
              type="button"
              onClick={() => {
                setExpanded(true);
                onEnrollAction();
              }}
              disabled={disabled}
              className="w-full"
            >
              {isSubmitting ? '신청 중...' : `수강 신청 (${selectedCount}개)`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
