import {
  DefaultError,
  QueryKey,
  RefetchOptions,
  UseInfiniteQueryOptions as UseTSInfiniteQueryOptions,
  UseInfiniteQueryResult as UseTSInfiniteQueryResult,
  UseMutationOptions as UseTSMutationOptions,
  UseQueryOptions as UseTSQueryOptions,
  UseQueryResult as UseTSQueryResult,
} from '@tanstack/react-query';

import { CommonListProps } from '@/components/List/types';
import { ToastContext } from '@/components/Toast';
import { MapErrorFn } from '@/error/hooks';
import { QueryFnParams } from '@/types/api/pagination';

export type UseMutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = Omit<
  UseTSMutationOptions<TData, TError, TVariables, TContext>,
  'onError'
> & {
  showToastError?: boolean;
  onError?: (
    ...params: [
      ...Parameters<
        Required<
          UseTSMutationOptions<TData, TError, TVariables, TContext>
        >['onError']
      >,
      showError: ToastContext['showError'],
      mapError: MapErrorFn,
    ]
  ) => void;
};

export interface UseManualRefetchResult {
  manualRefetch: (params?: RefetchOptions) => Promise<void>;
  isRefetchingManually: boolean;
}

export type QueryListPropsResult = CommonListProps & {
  onEndReached?: (info?: { distanceFromEnd: number }) => void;
};

export type QueryContainerProps = Partial<
  Pick<UseTSQueryResult, 'isLoading' | 'isError'>
> & {
  error?: unknown;
};

export type UseQueryResult<
  TData = unknown,
  TError = DefaultError,
> = UseTSQueryResult<TData, TError> &
  UseManualRefetchResult & {
    isEmpty: boolean;
    listProps: QueryListPropsResult;
    queryContainerProps: QueryContainerProps;
  };

export type UseQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseTSQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {};

export type UseQueryMinimalOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
>;

export type UseInfiniteQueryResult<
  TQueryFnData = unknown,
  TData = unknown,
  TError = DefaultError,
  TExtraData extends Record<string, unknown> | undefined = undefined,
> = UseTSInfiniteQueryResult<TData, TError> &
  UseManualRefetchResult & {
    isEmpty: boolean;
    results: TQueryFnData[];
    extraData: TExtraData;
    onEndReached: (info?: { distanceFromEnd: number }) => void;
    listProps: QueryListPropsResult;
  };

export interface UseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = number,
  TTransformData = TData,
  TExtraData extends Record<string, unknown> | undefined = undefined,
> extends Omit<
    UseTSInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >,
    'queryFn' | 'getNextPageParam' | 'initialPageParam'
  > {
  selectPageData?: (data: TQueryFnData[]) => TTransformData[];
  queryFn: (
    params: QueryFnParams<TQueryKey>,
  ) => Promise<{ results: TQueryData[]; extraData?: TExtraData }>;
  limit?: number;
}
