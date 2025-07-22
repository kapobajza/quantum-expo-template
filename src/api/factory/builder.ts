import { buildRequest } from './request';
import { CreateHttpClientParams } from './types';

export const createApiBuilder = <
  TAdditionalParams extends Record<string, unknown> | undefined =
    | Record<string, unknown>
    | undefined,
  TResponse extends Record<
    string,
    (...args: never[]) => ReturnType<typeof buildRequest>
  > = Record<string, (...args: never[]) => ReturnType<typeof buildRequest>>,
>(
  build: (params: CreateHttpClientParams & TAdditionalParams) => TResponse,
) => {
  return (params: CreateHttpClientParams & TAdditionalParams) => {
    return build(params);
  };
};
