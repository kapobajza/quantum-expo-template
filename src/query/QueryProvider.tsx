import { QueryCache, QueryClient } from '@tanstack/react-query';
import {
  Persister,
  PersistQueryClientProvider,
} from '@tanstack/react-query-persist-client';
import React, { ReactNode, useState } from 'react';

import { useToast } from '@/components/Toast';
import { databaseRepository } from '@/db/instance';
import { createSqlitePersister } from '@/db/persister';
import { useMapError } from '@/error/hooks';

const defaultPersister = createSqlitePersister(
  databaseRepository.queryRepository,
);

export const QueryProvider = ({
  children,
  persister,
}: {
  children: ReactNode;
  persister?: Persister;
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
        persister: persister ?? defaultPersister,
      }}
      onSuccess={onPersisterSuccess}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
