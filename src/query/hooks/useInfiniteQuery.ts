import {
  DefaultError,
  InfiniteData,
  QueryClient,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery as useTSInfiniteQuery,
} from '@tanstack/react-query';

import { UseInfiniteQueryOptions, UseInfiniteQueryResult } from './types';
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
  const { extraData = {}, results = [] } =
    (res.data as unknown as
      | {
          results: TQueryFnData[];
          extraData: TExtraData;
        }
      | undefined) ?? {};
  const isEmpty = isEmptyQueryResult(results);

  return {
    ...res,
    isEmpty,
    results,
    extraData: extraData as TExtraData,
  };
}

export default useInfiniteQuery;
