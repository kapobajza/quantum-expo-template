import { HttpStatusCode } from 'axios';
import Constants from 'expo-constants';

import { ErrorCode, HttpError } from '@/error';
import { AuthSignUpRequestBody } from '@/types';

import { createApiBuilder, createHttpClient } from './factory';

export const createAuthApi = createApiBuilder((options) => {
  const authHttpClient = createHttpClient({
    ...options,
    urlPrefix: 'auth/v1',
    baseURL: options.env.API_BASE_URL,
  });

  return {
    signup(data: AuthSignUpRequestBody) {
      if (!Constants.expoConfig?.scheme) {
        throw new HttpError(
          HttpStatusCode.BadRequest,
          ErrorCode.InternalMissingAppSchema,
        );
      }

      return authHttpClient.post({
        path: 'signup',
        body: data,
        queryParams: {
          redirect_to: `${Constants.expoConfig.scheme as string}://auth/verify`,
        },
      });
    },
  };
});

export type AuthApi = ReturnType<typeof createAuthApi>;
