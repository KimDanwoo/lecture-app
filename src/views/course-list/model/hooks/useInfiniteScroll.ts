'use client';

import { useEffect } from 'react';

export function useInfiniteScroll(input: {
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  enabled: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
  rootMargin?: string;
}) {
  const { sentinelRef, enabled, hasNextPage, isFetchingNextPage, fetchNextPage, rootMargin = '200px' } = input;

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
        void fetchNextPage();
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => {
      void observer.disconnect();
    };
  }, [enabled, fetchNextPage, hasNextPage, isFetchingNextPage, rootMargin, sentinelRef]);
}

