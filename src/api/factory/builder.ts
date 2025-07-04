import { buildRequest } from './request';
import { CreateHttpClientParams } from './types';

export const createApiBuilder = <
  TResponse extends Record<
    string,
    (...args: never[]) => ReturnType<typeof buildRequest>
  >,
>(
  build: (params: CreateHttpClientParams) => TResponse,
) => {
  return (params: CreateHttpClientParams) => {
    return build(params);
  };
};
