import { createQueryOptionsFactory } from './factory';

export const createUsersQueryOptions = createQueryOptionsFactory(
  'users',
  (api) => ({
    me: {
      queryKey: ['me'],
      async queryFn() {
        const { data } = await api.userApi.me();
        return data;
      },
    },
  }),
);
