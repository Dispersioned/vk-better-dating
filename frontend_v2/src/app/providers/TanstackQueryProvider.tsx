import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { queryClient } from '@shared/api/httpClient';

type TanstackQueryProviderProps = PropsWithChildren;

export function TanstackQueryProvider({ children }: TanstackQueryProviderProps) {
  return (
    <QueryClientProvider
      client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
