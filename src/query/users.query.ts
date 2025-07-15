import { useApi } from '@/api';

import { createQueryOptionsFactory } from './factory';

export const createUsersQueryOptions = createQueryOptionsFactory(
  'users',
  () => {
    const { authApi } = useApi();

    return {
      me: {
        queryKey: ['me'],
        async queryFn() {
          const { data } = await authApi.getMe();
          return data;
        },
      },
    };
  },
);
