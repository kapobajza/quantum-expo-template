import {
  useQuery,
  UseQueryMinimalOptions,
  useQueryOptionsFactory,
} from '@/query';
import { UserDto } from '@/types';

export const useMeQuery = (options?: UseQueryMinimalOptions<UserDto>) => {
  const queryOptions = useQueryOptionsFactory();

  return useQuery({
    ...queryOptions.users.me,
    ...options,
  });
};

export const useMeQueryCached = (options?: UseQueryMinimalOptions<UserDto>) => {
  return useMeQuery({
    ...options,
    staleTime: Infinity,
  });
};
