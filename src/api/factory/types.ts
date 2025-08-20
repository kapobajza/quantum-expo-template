import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';

import { AppEnv } from '@/env';
import { LoggingService, StorageService } from '@/services';

export type PaginationQueryParams = Partial<{
  offset: number;
  limit: number;
}>;

export type QueryParams = Record<string, unknown> & PaginationQueryParams;

export interface ClientRequestParams<
  RequestBody = unknown,
  Schema extends z.ZodType | undefined = undefined,
  Path extends string | undefined = undefined,
  PathParams extends
    | Record<string, string | number | boolean>
    | undefined = undefined,
> {
  path?: Path;
  body?: RequestBody;
  options?: AxiosRequestConfig;
  queryParams?: QueryParams;
  useDefaultQueryPaginationParams?: boolean;
  schema?: Schema;
  pathParams?: PathParams;
}

type ExtractPathParams<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Record<Param, string> & ExtractPathParams<Rest>
    : Path extends `${string}:${infer Param}`
      ? Record<Param, string>
      : object;

export type ConstructRequestParams<
  RequestBody,
  Schema extends z.ZodType | undefined,
  Path extends string,
> = ClientRequestParams<
  RequestBody,
  Schema,
  Path,
  // @ts-expect-error - Cannot infer the type of PathParams properly
  ExtractPathParams<Path>
>;

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface CreateHttpClientParams {
  env: AppEnv;
  storageService: StorageService;
  loggerService: LoggingService;
  createHttpInstance?: (baseURL: string) => AxiosInstance;
}
