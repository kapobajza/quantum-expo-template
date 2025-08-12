import {
  FactoryField,
  FactoryQueryKey,
  mergeQueryOptions,
} from '@/query/factory';
import { createUsersQueryOptions } from '@/query/users.query';
import { Prettify } from '@/types';
import { createChatsQueryOptions } from '@/query/chats.query';

type ConvertOptionsToQueryKeys<T> = {
  [K in Exclude<keyof T, '__name'>]: T[K] extends { queryKey: FactoryQueryKey }
    ? T[K]['queryKey']
    : T[K] extends (...args: infer RArgs) => { queryKey: infer RQueryKey }
      ? (...args: RArgs) => RQueryKey
      : never;
};

export const constructQueryKeys = <TOptions extends object>(
  queryOptions: TOptions,
) => {
  return Object.entries(queryOptions).reduce<{
    [K in keyof typeof queryOptions]: Prettify<
      ConvertOptionsToQueryKeys<(typeof queryOptions)[K]>
    >;
  }>(
    (acc, [key, value]) => {
      return {
        ...acc,
        [key]: Object.entries(value as object).reduce<
          ConvertOptionsToQueryKeys<typeof value>
        >((obj, [subKey, subValue]) => {
          if (typeof subValue === 'string') {
            return obj;
          }

          if (typeof subValue === 'function') {
            return {
              ...obj,
              [subKey]: function createQueryKey(...args: unknown[]) {
                return (subValue as (...args: unknown[]) => FactoryField)(
                  ...args,
                ).queryKey;
              },
            };
          }

          return {
            ...obj,
            [subKey]: (subValue as FactoryField).queryKey,
          };
        }, {}),
      };
    },
    {} as {
      [K in keyof typeof queryOptions]: Prettify<
        ConvertOptionsToQueryKeys<(typeof queryOptions)[K]>
      >;
    },
  );
};

export const createQueryBuilder = () => {
  const usersQueryOptions = createUsersQueryOptions();
  const chatsQueryOptions = createChatsQueryOptions();
  const queryOptions = mergeQueryOptions(usersQueryOptions, chatsQueryOptions);
  const queryKeys = constructQueryKeys(queryOptions);

  return {
    queryOptions,
    queryKeys,
  };
};
