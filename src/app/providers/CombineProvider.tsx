'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { ErrorBoundaryProvider } from '@/shared/lib/error';
import { Snackbar } from '@/shared/ui/snackbar';

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
        <Snackbar />
      </QueryClientProvider>
    </ErrorBoundaryProvider>
  );
}
