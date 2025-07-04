import { z } from 'zod';

import { createApiBuilder, createHttpClient } from './factory';

const baseResponseSchema = z.object({
  message: z.string().optional(),
});

export const createAuthApi = createApiBuilder((options) => {
  const authHttpClient = createHttpClient({
    ...options,
    urlPrefix: 'auth',
  });

  return {
    login(data: SendLoginOTPParams) {
      return authHttpClient.post({
        path: 'login',
        body: data,
        schema: baseResponseSchema,
      });
    },

    signup(data: SendSignupOTPParams) {
      return authHttpClient.post({
        path: 'signup',
        body: data,
        schema: baseResponseSchema,
      });
    },
  };
});

export type AuthApi = ReturnType<typeof createAuthApi>;
