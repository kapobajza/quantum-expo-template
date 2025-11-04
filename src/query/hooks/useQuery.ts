import {
  DefaultError,
  QueryClient,
  QueryKey,
  UseQueryOptions,
  useQuery as useTSQuery,
} from '@tanstack/react-query';

import { QueryContainerProps, UseQueryResult } from './types';
import useManualRefetch from './useManualRefetch';
import { constructQueryListProps, isEmptyQueryResult } from './util';

function useQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient,
): UseQueryResult<NoInfer<TData>, TError> {
  const res = useTSQuery(options, queryClient);
  const isEmpty = isEmptyQueryResult(res.data);
  const manualRefetchResult = useManualRefetch(res.refetch);
  const queryResult = {
    ...res,
    ...manualRefetchResult,
    isEmpty,
  };
  const queryContainerProps: QueryContainerProps = {
    error: res.error,
    isError: res.isError,
    isLoading: res.isLoading,
  };

  return {
    ...queryResult,
    listProps: constructQueryListProps(queryResult),
    queryContainerProps,
  };
}

export default useQuery;
