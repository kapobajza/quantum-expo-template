import { useApi } from '@/api';
import {
  FactoryField,
  FactoryQueryKey,
  mergeQueryOptions,
} from '@/query/factory';
import { createUsersQueryOptions } from '@/query/users.query';
import { Prettify } from '@/types';

type ConvertOptionsToQueryKeys<T> = {
  [K in Exclude<keyof T, '__name'>]: T[K] extends { queryKey: FactoryQueryKey }
    ? T[K]['queryKey']
    : never;
};

export const useQueryBuilder = () => {
  const api = useApi();
  const usersQueryOptions = createUsersQueryOptions(api);
  const queryOptions = mergeQueryOptions(usersQueryOptions);

  const queryKeys = Object.entries(queryOptions).reduce(
    (acc, [key, value]) => {
      return {
        ...acc,
        [key]: Object.entries(value).reduce<
          ConvertOptionsToQueryKeys<typeof value>
        >(
          (obj, [subKey, subValue]) => {
            if (typeof subValue === 'string') {
              return obj;
            }

            return {
              ...obj,
              [subKey]: (subValue as FactoryField).queryKey,
            };
          },
          {} as ConvertOptionsToQueryKeys<typeof value>,
        ),
      };
    },
    {} as {
      [K in keyof typeof queryOptions]: Prettify<
        ConvertOptionsToQueryKeys<(typeof queryOptions)[K]>
      >;
    },
  );

  return {
    queryOptions,
    queryKeys,
  };
};
