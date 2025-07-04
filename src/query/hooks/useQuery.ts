import {
  DefaultError,
  QueryClient,
  QueryKey,
  UseQueryOptions,
  useQuery as useTSQuery,
} from '@tanstack/react-query';

import { UseQueryResult } from './types';
import { isEmptyQueryResult } from './util';

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

  return {
    ...res,
    isEmpty,
  };
}

export default useQuery;
