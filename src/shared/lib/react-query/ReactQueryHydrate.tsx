'use client';

import { HydrationBoundary, type DehydratedState } from '@tanstack/react-query';
import type { ReactNode } from 'react';

/**
 * @description React Query 하이드레이션
 * @param state - 하이드레이션 상태
 * @param children - 하이드레이션 하위 컴포넌트
 * @returns 하이드레이션 컴포넌트
 */
export function ReactQueryHydrate({ state, children }: { state: DehydratedState; children: ReactNode }) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
