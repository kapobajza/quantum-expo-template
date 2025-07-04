import { AuthApi } from '@/api/auth.api';
import { UserApi } from '@/api/user.api';

export interface AllApiRouters {
  userApi: UserApi;
  authApi: AuthApi;
}

/**
 * A helper utility type to map the request methods of the api clients
 */
type ApiClientMethods<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => {
    request(): infer Return;
  }
    ? (...args: Args) => Return
    : T[K];
};

export type AllApiClients = {
  [ApiClientKey in keyof AllApiRouters]: ApiClientMethods<
    AllApiRouters[ApiClientKey]
  >;
};
