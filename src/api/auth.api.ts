import { HttpStatusCode } from 'axios';
import Constants from 'expo-constants';
import { Href } from 'expo-router';

import { ErrorCode, HttpError } from '@/error';
import {
  AuthSignInRequestBody,
  AuthSignUpRequestBody,
  sessionSchema,
  userResponseSchema,
} from '@/types';

import { createApiBuilder, createHttpClient } from './factory';

export const createAuthApi = createApiBuilder((options) => {
  const authHttpClient = createHttpClient({
    ...options,
    urlPrefix: 'auth/v1',
    baseURL: options.env.API_BASE_URL,
  });

  return {
    signIn(data: AuthSignInRequestBody) {
      return authHttpClient.post({
        path: 'token',
        body: data,
        queryParams: {
          grant_type: 'password',
        },
        schema: sessionSchema,
      });
    },

    signUp(data: AuthSignUpRequestBody) {
      if (!Constants.expoConfig?.scheme) {
        throw new HttpError(
          HttpStatusCode.BadRequest,
          ErrorCode.MissingAppSchema,
        );
      }

      const redirect: Href = '/auth/email-confirmed';

      return authHttpClient.post({
        path: 'signup',
        body: data,
        queryParams: {
          redirect_to: `${Constants.expoConfig.scheme as string}:/${redirect}`,
        },
      });
    },

    refreshToken() {
      return authHttpClient.post({
        path: 'token',
        queryParams: { grant_type: 'refresh_token' },
        schema: sessionSchema,
      });
    },

    getMe() {
      return authHttpClient.get({
        path: 'user',
        schema: userResponseSchema,
      });
    },

    signOut() {
      return authHttpClient.post({
        path: 'logout',
      });
    },
  };
});

export type AuthApi = ReturnType<typeof createAuthApi>;
