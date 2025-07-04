import axios from 'axios';
import { z } from 'zod';

import { buildRequest } from './request';
import { ConstructRequestParams, CreateHttpClientParams } from './types';

export const createHttpClient = ({
  env,
  storageService,
  urlPrefix,
  createHttpInstance,
}: CreateHttpClientParams & {
  urlPrefix: string;
}) => {
  const instance = createHttpInstance
    ? createHttpInstance(env.API_URL)
    : axios.create({
        baseURL: env.API_URL,
        timeout: 5000, // 20 seconds
      });

  instance.interceptors.request.use(async (req) => {
    const tokenItem = await storageService.getSecureItem('AuthToken');

    if (tokenItem) {
      req.headers.Authorization = `Bearer ${tokenItem.token}`;
    }

    return req;
  });

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
