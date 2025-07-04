import { QueryOptions } from '@tanstack/react-query';

import { AllApiClients } from '@/api';
import { Prettify } from '@/types';

type FactoryQueryKeyArrayType = string | number | object | boolean | undefined;

type NonEmptyArray<T> = [T, ...T[]];

export type FactoryQueryKey =
  | string
  | NonEmptyArray<FactoryQueryKeyArrayType>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((...args: any[]) => NonEmptyArray<FactoryQueryKeyArrayType>);

export interface FactoryField
  extends Omit<QueryOptions, 'queryKey' | 'queryFn'> {
  queryKey: FactoryQueryKey;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFn: (...args: any[]) => any;
}

type FactoryOptions = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FactoryField | string | ((...args: any[]) => FactoryField)
>;

type FactoryOptionsExtended<
  TOptions extends FactoryOptions = FactoryOptions,
  TName extends string = string,
> = TOptions & {
  __name: TName;
};

export function createQueryOptionsFactory<
  TFactoryQueryKeyName extends string,
  const TOptions extends FactoryOptions,
>(
  name: TFactoryQueryKeyName,
  options: (api: AllApiClients) => TOptions,
): (
  api: AllApiClients,
) => FactoryOptionsExtended<TOptions, TFactoryQueryKeyName> {
  return (api) => {
    const queryOptions = options(api);

    const obj = Object.entries(queryOptions).reduce<FactoryOptions>(
      (acc, [key, value]) => {
        if (typeof value === 'string') {
          return acc;
        }

        if (typeof value === 'function') {
          return {
            ...acc,
            [key]: (...args: unknown[]) => ({
              ...value(...args),
              queryKey: [
                name,
                ...(value(...args).queryKey as FactoryQueryKeyArrayType[]),
              ],
            }),
          };
        }

        if (Array.isArray(value.queryKey)) {
          acc[key] = {
            ...value,
            queryKey: [name, ...value.queryKey],
          };
        } else if (typeof value.queryKey === 'function') {
          const queryKeyFn = value.queryKey as (
            ...args: unknown[]
          ) => NonEmptyArray<FactoryQueryKeyArrayType>;

          acc[key] = {
            ...value,
            queryKey: (...args: unknown[]) => [
              name,
              ...queryKeyFn(...args).filter(Boolean),
            ],
          };
        }

        return acc;
      },
      {},
    );

    return {
      ...obj,
      __name: name,
    } as FactoryOptionsExtended<TOptions, TFactoryQueryKeyName>;
  };
}

type StoreFromMergedQueryKeys<TMergeArgs extends FactoryOptionsExtended[]> =
  TMergeArgs extends [
    infer TFirst extends FactoryOptionsExtended,
    ...infer TRest extends FactoryOptionsExtended[],
  ]
    ? Record<TFirst['__name'], Prettify<Omit<TFirst, '__name'>>> &
        StoreFromMergedQueryKeys<TRest>
    : unknown;

export function mergeQueryOptions<TArgs extends FactoryOptionsExtended[]>(
  ...args: TArgs
): Prettify<StoreFromMergedQueryKeys<TArgs>> {
  return args.reduce<Record<string, unknown>>((acc, value) => {
    return {
      ...acc,
      [value.__name]: Object.entries(value).reduce((obj, [key, val]) => {
        if (key === '__name') {
          return obj;
        }

        return {
          ...obj,
          [key]: val as FactoryField,
        };
      }, {}),
    };
  }, {}) as StoreFromMergedQueryKeys<TArgs>;
}
