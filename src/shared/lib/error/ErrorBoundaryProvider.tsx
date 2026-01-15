'use client';

import React from 'react';

import { snackbar } from '@/shared/ui';

type ReportErrorInput =
  | string
  | {
      message: string;
      cause?: unknown;
    }
  | unknown;

type ErrorReportContextValue = {
  /**
   * catch 블록 등에서 명시적으로 에러를 전역 처리(스낵바)로 넘길 때 사용
   */
  reportError: (err: ReportErrorInput) => void;
};

const ErrorReportContext = React.createContext<ErrorReportContextValue | null>(null);

function toMessage(err: ReportErrorInput) {
  if (typeof err === 'string') return err;
  if (
    err &&
    typeof err === 'object' &&
    'message' in err &&
    typeof (err as Record<string, unknown>).message === 'string'
  ) {
    return String((err as Record<string, unknown>).message);
  }
  if (err instanceof Error) return err.message || '알 수 없는 오류가 발생했습니다.';
  return '알 수 없는 오류가 발생했습니다.';
}

class GlobalErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    onError?: (error: Error, info: React.ErrorInfo) => void;
  },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // 렌더링/라이프사이클 에러를 전역 스낵바로 표출
    snackbar.error(error.message || '화면 처리 중 오류가 발생했습니다.');
    this.props.onError?.(error, info);
  }

  render() {
    // UX: 전역 스낵바로 알리는 게 목적이라, 화면 자체는 그대로 두는 것이 일반적이지만
    // React ErrorBoundary 특성상 에러가 나면 subtree 렌더가 깨지므로 최소한의 fallback을 보여줌.
    if (this.state.hasError) {
      return (
        <div className="mx-auto w-full max-w-3xl px-4 py-8">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-700 dark:text-red-300">
            화면을 표시하는 중 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * @description 에러 바운더리 제공자
 * @param props - 에러 바운더리 제공자 파라미터
 * @returns 에러 바운더리 제공자
 */
export function ErrorBoundaryProvider(props: { children: React.ReactNode }) {
  const value = React.useMemo<ErrorReportContextValue>(
    () => ({
      reportError: (err) => {
        snackbar.error(toMessage(err));
      },
    }),
    [],
  );

  return (
    <ErrorReportContext.Provider value={value}>
      <GlobalErrorBoundary>{props.children}</GlobalErrorBoundary>
    </ErrorReportContext.Provider>
  );
}

export function useErrorReporter() {
  const ctx = React.useContext(ErrorReportContext);
  if (!ctx) {
    throw new Error('useErrorReporter는 ErrorBoundaryProvider 내부에서만 사용할 수 있습니다.');
  }
  return ctx;
}
