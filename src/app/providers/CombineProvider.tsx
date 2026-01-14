'use client';

import { ErrorBoundaryProvider } from '@/shared/lib/error';
import { SnackbarHost } from '@/shared/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function CombineProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ErrorBoundaryProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <SnackbarHost />
      </QueryClientProvider>
    </ErrorBoundaryProvider>
  );
}
