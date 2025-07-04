import {
  PersistedClient,
  Persister,
} from '@tanstack/react-query-persist-client';

import { QueryRepo } from './repo';

type DehydratedMutation = PersistedClient['clientState']['mutations'][number];
type DehydratedQuery = PersistedClient['clientState']['queries'][number];

export function createSqlitePersister(queryRepo: QueryRepo): Persister {
  let debounceTimeoutId: number | null = null;

  const persistClientWithDebounce = (persistClient: PersistedClient) => {
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    debounceTimeoutId = setTimeout(async () => {
      const { clientState, timestamp, buster } = persistClient;

      await queryRepo.initTx(async (tx) => {
        const queryClients = await queryRepo.insertQueryClient(tx, {
          timestamp,
          buster,
        });
        const queryClient = queryClients[0];

        if (clientState.queries.length > 0) {
          await queryRepo.insertQueries(
            tx,
            clientState.queries.map((query) => ({
              queryHash: query.queryHash,
              queryClientId: queryClient.id,
              value: JSON.stringify(query.state),
            })),
          );
        }

        if (clientState.mutations.length > 0) {
          await queryRepo.insertMutations(
            tx,
            clientState.mutations.map((mutation) => ({
              mutationKey: mutation.mutationKey
                ? JSON.stringify(mutation.mutationKey)
                : undefined,
              queryClientId: queryClient.id,
              value: JSON.stringify(mutation.state),
            })),
          );
        }
      });
    }, 500);
  };

  return {
    persistClient: persistClientWithDebounce,
    restoreClient: async function (): Promise<PersistedClient | undefined> {
      const res = await queryRepo.getQueryClient();

      if (res.length === 0) {
        return undefined;
      }

      const queryClient = res[0];
      const dehydratedQueries: DehydratedQuery[] = [];
      const dehydratedMutations: DehydratedMutation[] = [];

      for (const item of res) {
        if (item.queries) {
          dehydratedQueries.push({
            queryHash: item.queries.queryHash,
            state: JSON.parse(item.queries.value) as DehydratedQuery['state'],
            queryKey: JSON.parse(
              item.queries.queryHash,
            ) as DehydratedQuery['queryKey'],
          });
        }

        if (item.mutations) {
          dehydratedMutations.push({
            mutationKey: item.mutations.mutationKey
              ? (JSON.parse(
                  item.mutations.mutationKey,
                ) as DehydratedMutation['mutationKey'])
              : undefined,
            state: JSON.parse(
              item.mutations.value,
            ) as DehydratedMutation['state'],
          });
        }
      }

      return {
        buster: queryClient.buster,
        timestamp: queryClient.timestamp,
        clientState: {
          queries: dehydratedQueries,
          mutations: dehydratedMutations,
        },
      };
    },
    removeClient: async function () {
      await queryRepo.removeQueryClient();
    },
  };
}
