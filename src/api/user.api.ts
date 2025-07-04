import { userResponseSchema } from '@/types/api/user.dto';

import { createApiBuilder, createHttpClient } from './factory';

export const createUserApi = createApiBuilder((options) => {
  const userHttpClient = createHttpClient({
    ...options,
    urlPrefix: 'users',
  });

  return {
    me() {
      return userHttpClient.get({
        path: 'me',
        schema: userResponseSchema,
      });
    },
  };
});

export type UserApi = ReturnType<typeof createUserApi>;
