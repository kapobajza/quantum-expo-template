import { QueryCache, QueryClient } from '@tanstack/react-query';
import {
  Persister,
  PersistQueryClientProvider,
} from '@tanstack/react-query-persist-client';
import React, { ReactNode, useState } from 'react';

import { useToast } from '@/components/Toast';
import { useMapError } from '@/error/hooks';

export const QueryProvider = ({
  children,
  persister,
}: {
  children: ReactNode;
  persister: Persister;
}) => {
  const mapError = useMapError();
  const { showError } = useToast();

  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 min
        },
      },
      queryCache: new QueryCache({
        onError(error, query) {
          if (query.meta?.hideToastError) {
            return;
          }

          showError(mapError(error));
        },
      }),
    });
  });

  const onPersisterSuccess = async () => {
    await queryClient.resumePausedMutations();
  };

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
      }}
      onSuccess={onPersisterSuccess}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
