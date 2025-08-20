import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { z } from 'zod';

import { AppError, ErrorCode, parseError } from '@/error';
import { SessionResponse } from '@/types';

import { buildRequest } from './request';
import { ConstructRequestParams, CreateHttpClientParams } from './types';

export const createHttpClient = ({
  env,
  storageService,
  urlPrefix,
  createHttpInstance,
  baseURL = env.API_REST_URL,
  loggerService,
  databaseService,
}: CreateHttpClientParams & {
  urlPrefix: string;
  baseURL?: string;
}) => {
  const instance = createHttpInstance
    ? createHttpInstance(baseURL)
    : axios.create({
        baseURL,
        timeout: 15000, // 15 seconds
      });

  instance.interceptors.request.use(async (req) => {
    const tokenItem = await storageService.getSecureItem('AuthToken');

    if (tokenItem) {
      req.headers.Authorization = `Bearer ${tokenItem.token}`;
    }

    req.headers.apikey = env.API_KEY;

    return req;
  });

  let isRefreshing = false;

  let failedQueue: {
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
  }[] = [];

  const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      const errResponse = parseError(error);

      if (errResponse?.code === 403 && errResponse.error_code === 'bad_jwt') {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return instance(originalRequest);
            })
            .catch((err: unknown) => {
              return Promise.reject(err as Error);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const tokenItem = await storageService.getSecureItem('AuthToken');

          if (!tokenItem) {
            throw new AppError({
              code: ErrorCode.Unauthorized,
            });
          }

          const response = await axios.post<SessionResponse>(
            '/auth/v1/token',
            {
              refresh_token: tokenItem.refreshToken,
            },
            {
              params: {
                grant_type: 'refresh_token',
              },
              baseURL: env.API_BASE_URL,
              headers: {
                apikey: env.API_KEY,
              },
            },
          );

          const newToken = response.data.access_token;

          await storageService.setSecureItem('AuthToken', {
            token: newToken,
            refreshToken: response.data.refresh_token,
          });
          await databaseService.setAccessToken(newToken);

          instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;

          processQueue(null, newToken);

          // eslint-disable-next-line @typescript-eslint/return-await
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as Error, null);
          await storageService.deleteSecureItem('AuthToken');
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }

      loggerService.captureException(error);
      return Promise.reject(error);
    },
  );

  return {
    get: <Schema extends z.ZodType | undefined, Path extends string>(
      params?: Omit<ConstructRequestParams<unknown, Schema, Path>, 'body'>,
    ) => {
      return buildRequest({
        instance,
        method: 'get',
        params,
        urlPrefix,
      });
    },
    post: <
      Schema extends z.ZodType | undefined,
      Path extends string,
      RequestBody = unknown,
    >(
      params?: ConstructRequestParams<RequestBody, Schema, Path>,
    ) => {
      return buildRequest({
        instance,
        method: 'post',
        params,
        urlPrefix,
      });
    },
    put: <
      Schema extends z.ZodType | undefined,
      Path extends string,
      RequestBody = unknown,
    >(
      params?: ConstructRequestParams<RequestBody, Schema, Path>,
    ) => {
      return buildRequest({
        instance,
        method: 'put',
        params,
        urlPrefix,
      });
    },
    patch: <
      Schema extends z.ZodType | undefined,
      Path extends string,
      RequestBody = unknown,
    >(
      params?: ConstructRequestParams<RequestBody, Schema, Path>,
    ) => {
      return buildRequest({
        instance,
        method: 'patch',
        params,
        urlPrefix,
      });
    },
    delete: <
      Schema extends z.ZodType | undefined,
      Path extends string,
      RequestBody = unknown,
    >(
      params?: ConstructRequestParams<RequestBody, Schema, Path>,
    ) => {
      return buildRequest({
        instance,
        method: 'delete',
        params,
        urlPrefix,
      });
    },
  };
};

export type HttpClient = ReturnType<typeof createHttpClient>;
