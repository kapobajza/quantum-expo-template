import { NonEmptyArray } from '@/types';

import { FactoryQueryKeyArrayType } from './factory';
import { InfiniteQueryResponse } from './types';

export function combineQueryKeys(
  ...items: unknown[]
): NonEmptyArray<FactoryQueryKeyArrayType> {
  return items.filter(
    (item) => item !== null && item !== undefined && item !== '',
  ) as NonEmptyArray<FactoryQueryKeyArrayType>;
}

export function createInfiniteQueryResponse<
  TData,
  TExtraData extends Record<string, unknown>,
>(data: TData[], extraData?: TExtraData) {
  return {
    results: data,
    extraData,
  } satisfies InfiniteQueryResponse<TData, TExtraData>;
}
