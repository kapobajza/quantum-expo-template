import { QueryOptions } from '@tanstack/react-query';

import { QueryFnParams } from '@/types/api/pagination';
import { Prettify } from '@/types/common';

export type FactoryQueryKeyArrayType =
  | string
  | number
  | object
  | boolean
  | undefined;

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
  queryFn: (queryParams: QueryFnParams) => any;
  partial?: Record<string, FactoryQueryKeyArrayType[]>;
}

type FactoryOptions = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FactoryField | string | ((...args: any[]) => FactoryField)
>;

type PartialFactoryOptions = Record<
  string,
  | FactoryQueryKeyArrayType[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((...args: any[]) => FactoryQueryKeyArrayType[])
>;

type FactoryOptionsWithPartial =
  | FactoryOptions
  | {
      partial?: PartialFactoryOptions;
    };

export type FactoryOptionsExtended<
  TOptions extends FactoryOptionsWithPartial = FactoryOptionsWithPartial,
  TName extends string = string,
> = TOptions & {
  __name: TName;
  __rootQueryKey: [TName];
};

function generatePartialQueryKey(
  name: string,
  partial:
    | Record<
        string,
        | FactoryQueryKeyArrayType[]
        | ((...args: unknown[]) => FactoryQueryKeyArrayType[])
      >
    | undefined,
) {
  if (!partial) {
    return;
  }

  return Object.entries(partial).reduce<
    Record<
      string,
      | FactoryQueryKeyArrayType[]
      | ((...args: unknown[]) => FactoryQueryKeyArrayType[])
    >
  >((acc, [key, value]) => {
    if (typeof value === 'function') {
      const valueFn = value as (
        ...args: unknown[]
      ) => FactoryQueryKeyArrayType[];

      acc[key] = (...args: unknown[]) => [name, ...valueFn(...args)];
    } else {
      acc[key] = [name, ...value] as FactoryQueryKeyArrayType[];
    }

    return acc;
  }, {});
}

export function createQueryOptionsFactory<
  TFactoryQueryKeyName extends string,
  const TOptions extends FactoryOptionsWithPartial,
  TQueryArgs extends unknown[] = [],
>(
  name: TFactoryQueryKeyName,
  options: (...args: TQueryArgs) => TOptions,
): (
  ...args: TQueryArgs
) => FactoryOptionsExtended<TOptions, TFactoryQueryKeyName> {
  return (...args: TQueryArgs) => {
    const queryOptions = options(...args);

    const obj = Object.entries(queryOptions).reduce<FactoryOptionsWithPartial>(
      (
        acc,
        [key, value]: [
          string,
          FactoryField | string | ((...args: unknown[]) => FactoryField),
        ],
      ) => {
        if (key === 'partial') {
          return {
            ...acc,
            partial: generatePartialQueryKey(
              name,
              // @ts-expect-error - TS can't infer type here properly
              value as PartialFactoryOptions,
            ),
          };
        }

        if (typeof value === 'string') {
          return acc;
        }

        if (typeof value === 'function') {
          return {
            ...acc,
            [key]: (...args: unknown[]) => {
              const appliedFn = value(...args);

              return {
                ...appliedFn,
                queryKey: [
                  name,
                  ...(appliedFn.queryKey as FactoryQueryKeyArrayType[]),
                ],
              };
            },
          };
        }

        if (Array.isArray(value.queryKey)) {
          acc[key as keyof FactoryOptionsWithPartial] = {
            ...value,
            queryKey: [name, ...value.queryKey],
          };
        } else if (typeof value.queryKey === 'function') {
          const queryKeyFn = value.queryKey as (
            ...args: unknown[]
          ) => NonEmptyArray<FactoryQueryKeyArrayType>;

          (acc as FactoryOptions)[key as keyof FactoryOptionsWithPartial] = {
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
      __rootQueryKey: [name],
    } as FactoryOptionsExtended<TOptions, TFactoryQueryKeyName>;
  };
}

export type StoreFromMergedQueryKeys<
  TMergeArgs extends FactoryOptionsExtended[],
> = TMergeArgs extends [
  infer TFirst extends FactoryOptionsExtended,
  ...infer TRest extends FactoryOptionsExtended[],
]
  ? Record<
      TFirst['__name'],
      Prettify<Omit<TFirst, '__name'>> & {
        __rootQueryKey: [TFirst['__name']];
      }
    > &
      StoreFromMergedQueryKeys<TRest>
  : unknown;
