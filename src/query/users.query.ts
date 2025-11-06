import { useApi } from '@/api';

import { createQueryOptionsFactory } from './factory';

export const useUsersQueryOptions = () => {
  const { authApi } = useApi();

  return createQueryOptionsFactory('users', {
    me: {
      queryKey: ['me'],
      async queryFn() {
        const { data } = await authApi.getMe();
        return data;
      },
    },
  });
};
