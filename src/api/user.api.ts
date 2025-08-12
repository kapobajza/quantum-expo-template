import z from 'zod';

import { userResponseSchema } from '@/types/api/user.dto';

import { createApiBuilder, createHttpClient } from './factory';

export const createUserApi = createApiBuilder((options) => {
  const usersHttpClient = createHttpClient({
    ...options,
    urlPrefix: 'org_users',
  });

  return {
    getOrgUser(userId: string) {
      return usersHttpClient.get({
        queryParams: {
          select: 'id,email',
          auth_user_id: `eq.${userId}`,
          limit: 1,
        },
        schema: z.array(
          userResponseSchema.pick({
            id: true,
            email: true,
          }),
        ),
      });
    },

    getRandomUser(userId: string) {
      return usersHttpClient.get({
        queryParams: {
          select: 'id,email',
          id: `neq.${userId}`,
          limit: 1,
        },
        schema: z.array(
          userResponseSchema.pick({
            id: true,
            email: true,
          }),
        ),
      });
    },
  };
});

export type UserApi = ReturnType<typeof createUserApi>;
