import { QueryListPropsResult, UseInfiniteQueryResult } from './types';

export const isEmptyQueryResult = <TData>(data: NoInfer<TData>) => {
  if (typeof data === 'string' && data.length === 0) {
    return true;
  }

  if (data === undefined || data === null) {
    return true;
  }

  if (Array.isArray(data) && data.length === 0) {
    return true;
  }

  if (typeof data === 'object' && Object.keys(data).length === 0) {
    return true;
  }

  return false;
};

export const constructQueryListProps = (
  res: Partial<
    Pick<
      UseInfiniteQueryResult,
      | 'isEmpty'
      | 'isLoading'
      | 'isError'
      | 'isRefetchingManually'
      | 'manualRefetch'
      | 'isFetchingNextPage'
    >
  > & {
    error?: unknown;
    onEndReached?: () => void;
  },
) => {
  return {
    isEmpty: res.isEmpty,
    isLoading: res.isLoading,
    isError: res.isError,
    error: res.error,
    onEndReached: res.onEndReached,
    onRefresh: () => {
      void res.manualRefetch?.();
    },
    refreshing: res.isRefetchingManually,
    isLoadingMore: res.isFetchingNextPage,
  } satisfies QueryListPropsResult;
};
