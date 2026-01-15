'use client';

import { useEffect } from 'react';

const DEFAULT_INFINITE_SCROLL_ROOT_MARGIN = '200px';

/**
 * @description 무한 스크롤
 * @param input - 무한 스크롤 파라미터
 * @returns void
 */
export function useInfiniteScroll(input: {
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  enabled: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPageAction: () => Promise<unknown>;
  rootMargin?: string;
}) {
  const {
    sentinelRef,
    enabled,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPageAction,
    rootMargin = DEFAULT_INFINITE_SCROLL_ROOT_MARGIN,
  } = input;

  useEffect(() => {
    if (!enabled) return;

    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        if (!hasNextPage) return;
        if (isFetchingNextPage) return;
        void fetchNextPageAction();
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => {
      void observer.disconnect();
    };
  }, [enabled, fetchNextPageAction, hasNextPage, isFetchingNextPage, rootMargin, sentinelRef]);
}
