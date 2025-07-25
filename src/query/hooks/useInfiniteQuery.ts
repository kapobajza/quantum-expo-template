import {
  DefaultError,
  InfiniteData,
  QueryClient,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery as useTSInfiniteQuery,
} from '@tanstack/react-query';
import { useRef } from 'react';

import { UseInfiniteQueryOptions, UseInfiniteQueryResult } from './types';
import useManualRefetch from './useManualRefetch';
import { isEmptyQueryResult } from './util';

function useInfiniteQuery<
  TQueryFnData,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
  TTransformData = TQueryFnData,
  TExtraData extends Record<string, unknown> | undefined = undefined,
>(
  options: UseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryFnData,
    TQueryKey,
    TPageParam,
    TTransformData,
    TExtraData
  >,
  queryClient?: QueryClient,
): UseInfiniteQueryResult<TQueryFnData, TData, TError, TExtraData> {
  const promiseRef = useRef<Promise<void>>(null);
  const res = useTSInfiniteQuery<
    {
      results: TQueryFnData[];
      extraData?: TExtraData;
    },
    TError,
    TData,
    TQueryKey
  >(
    {
      // @ts-expect-error - it's hard to infer the proper select type with our custom generic types
      select(data) {
        const newData = data.pages.reduce<TQueryFnData[]>((arr, val) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          let results = val?.results ?? [];

          if (options.selectPageData) {
            results = options.selectPageData(
              results,
            ) as unknown as TQueryFnData[];
          }

          return [...arr, ...results];
        }, []);

        return {
          results: newData,
          extraData: data.pages[0]?.extraData,
        };
      },
      ...options,
      queryFn: async (params) => {
        return options.queryFn({
          ...(params as QueryFunctionContext<TQueryKey, TPageParam>),
          limit: options.limit ?? 10,
        });
      },
    },
    queryClient,
  );
  const manualRefetchResult = useManualRefetch(res.refetch);
  const { extraData = {}, results = [] } =
    (res.data as unknown as
      | {
          results: TQueryFnData[];
          extraData: TExtraData;
        }
      | undefined) ?? {};
  const isEmpty = isEmptyQueryResult(results);

  const fetchOnEndReach = () => {
    promiseRef.current ??= (async () => {
      try {
        await res.fetchNextPage();
      } finally {
        promiseRef.current = null;
      }
    })();
  };

  const onEndReached: UseInfiniteQueryResult['onEndReached'] = (info) => {
    const { distanceFromEnd } = info ?? {};

    if (typeof distanceFromEnd === 'number' && distanceFromEnd > 0) {
      fetchOnEndReach();
      return;
    }

    fetchOnEndReach();
  };

  return {
    ...res,
    ...manualRefetchResult,
    isEmpty,
    results,
    extraData: extraData as TExtraData,
    onEndReached,
  };
}

export default useInfiniteQuery;
