import { InfiniteData, QueryKey, useQueryClient } from '@tanstack/react-query';

export const useUpdateInfiniteQueryData = () => {
  const queryClient = useQueryClient();

  return {
    updateInfiniteQueryData: <TData>(
      queryKey: QueryKey,
      updater: (old: TData[]) => TData[],
    ) => {
      queryClient.setQueryData<InfiniteData<{ results: TData[] }>>(
        queryKey,
        (old) => {
          if (!old) {
            return undefined;
          }

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              results: updater(page.results),
            })),
          };
        },
      );
    },
  };
};
