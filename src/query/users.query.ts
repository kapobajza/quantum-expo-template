import { useApi } from '@/api';

import { createQueryOptionsFactory } from './factory';

export const createUsersQueryOptions = createQueryOptionsFactory(
  'users',
  () => {
    const { authApi, userApi } = useApi();

    return {
      me: {
        queryKey: ['me'],
        async queryFn() {
          const { data } = await authApi.getMe();
          const { data: orgUser } = await userApi.getOrgUser(data.id);

          return {
            ...data,
            originalId: data.id,
            id: orgUser[0].id,
          };
        },
      },
    };
  },
);
