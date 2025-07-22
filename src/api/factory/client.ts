import axios from 'axios';
import { z } from 'zod';

import { buildRequest } from './request';
import { ConstructRequestParams, CreateHttpClientParams } from './types';

export const createHttpClient = ({
  env,
  storageService,
  urlPrefix,
  createHttpInstance,
  baseURL = env.API_REST_URL,
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
