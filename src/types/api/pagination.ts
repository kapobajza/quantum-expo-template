import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

export type QueryFnParams<TQueryKey extends QueryKey = QueryKey> =
  QueryFunctionContext<TQueryKey, number> & {
    limit: number;
  };

export type QueryFnPagination = Partial<
  Pick<QueryFnParams, 'limit' | 'pageParam'>
>;
