import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { stringify } from 'qs';
import { z } from 'zod';

import { Prettify } from '@/types';

import {
  ClientRequestParams,
  ConstructRequestParams,
  HttpMethod,
  PaginationQueryParams,
  QueryParams,
} from './types';

const getPaginationQueryParams = (
  params: PaginationQueryParams | undefined,
): PaginationQueryParams => {
  const { limit = 10, offset = 0 } = params ?? {};

  return { limit, offset };
};

const generateRequestParams = <
  RequestBody = unknown,
  Schema extends z.ZodType | undefined = undefined,
  Path extends string = '',
>(
  params?: ConstructRequestParams<RequestBody, Schema, Path>,
) => {
  const { queryParams, useDefaultQueryPaginationParams } = params ?? {};
  let paginationParams: PaginationQueryParams | undefined;

  if (useDefaultQueryPaginationParams) {
    paginationParams = getPaginationQueryParams(queryParams);
  }

  return {
    ...params,
    queryParams:
      params?.queryParams || paginationParams
        ? {
            ...params?.queryParams,
            ...paginationParams,
          }
        : undefined,
  };
};

const buildFullRoute = <
  Schema extends z.ZodType | undefined,
  Path extends string,
  RequestBody = unknown,
>(
  urlPrefix: string,
  path: string | undefined,
  params?: ConstructRequestParams<RequestBody, Schema, Path>,
) => {
  let parameterizedRoute = path ?? '';

  if (params?.pathParams) {
    parameterizedRoute = Object.entries(params.pathParams).reduce(
      (acc, [key, value]) => {
        return acc.replace(`:${key}`, String(value));
      },
      path ?? '',
    );
  }

  return [urlPrefix, parameterizedRoute].filter(Boolean).join('/');
};

const buildFullUrl = (
  baseURL: string,
  route: string,
  queryParams: QueryParams | undefined = {},
) => {
  return `${baseURL}/${route}${stringify(queryParams, {
    addQueryPrefix: true,
  })}`;
};

export const buildRequest = <
  Schema extends z.ZodType | undefined,
  Path extends string,
  RequestBody = unknown,
>({
  instance,
  method,
  params,
  urlPrefix,
}: {
  instance: AxiosInstance;
  method: HttpMethod;
  params?: ConstructRequestParams<RequestBody, Schema, Path>;
  urlPrefix: string;
}): Prettify<{
  path: Path;
  route: string;
  url: string;
  request: () => Promise<
    ClientRequestParams<RequestBody, Schema>['schema'] extends undefined
      ? AxiosResponse<unknown>
      : AxiosResponse<Schema extends z.ZodType ? z.infer<Schema> : unknown>
  >;
}> => {
  const { path, options, queryParams, schema, body } =
    generateRequestParams(params);
  const route = buildFullRoute(urlPrefix, path, params);

  return {
    path: path as Path,
    route,
    url: buildFullUrl(instance.defaults.baseURL ?? '', route, queryParams),
    async request() {
      const doRequest = instance as <
        T = unknown,
        R = AxiosResponse<T>,
        D = unknown,
      >(
        config: AxiosRequestConfig<D>,
      ) => Promise<R>;

      const res = await doRequest({
        ...(options ?? {}),
        method,
        url: `${route}${stringify(queryParams, {
          addQueryPrefix: true,
        })}`,
        data: body,
      });

      let data: unknown = res.data;

      if (schema) {
        data = schema.safeParse(res.data).data ?? res.data;
      }

      return {
        ...res,
        data,
      } as ClientRequestParams<RequestBody, Schema>['schema'] extends undefined
        ? AxiosResponse<unknown>
        : AxiosResponse<Schema extends z.ZodType ? z.infer<Schema> : unknown>;
    },
  };
};
