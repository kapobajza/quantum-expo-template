import { createContext, use, useMemo } from 'react';

import { createAuthApi } from '@/api/auth.api';
import { CreateHttpClientParams } from '@/api/factory';
import { useAppEnv } from '@/env';
import { useService } from '@/services';

import { AllApiClients, AllApiRouters } from './types';

const ApiContext = createContext<
  | {
      apiRouter: AllApiRouters;
      apiClient: AllApiClients;
    }
  | undefined
>(undefined);

/**
 * This is a function that returns all the api clients with their mapped request methods.
 * It servers just as a wrapper to simplify the usage of the api clients provided inside the useApi hook.
 * @example
 * // If we didn't have this function, we would have to use useApiRouter everywhere and call the request method explicitly:
 * const { usersApi } = useApiRouter();
 * await usersApi.getMe().request();
 *
 * // So this function simplifies the usage and its return value is retrieved from the useApi hook:
 * const { usersApi } = useApi();
 * await usersApi.getMe();
 * @returns The parsed api clients with request methods
 */
const generateApiClient = (apiRouter: AllApiRouters) => {
  return Object.entries(apiRouter).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      type ApiValue = Record<
        string,
        (...args: unknown[]) => { request(): Promise<unknown> }
      >;
      const typedValue = value as ApiValue;

      acc[key] = Object.fromEntries(
        Object.entries(typedValue).map(([method, fn]) => {
          const apiFn = (...args: Parameters<typeof fn>) => {
            return fn(...args).request();
          };
          return [method, apiFn];
        }),
      );
      return acc;
    },
    {},
  ) as AllApiClients;
};

export const ApiProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: AllApiRouters;
}) => {
  const env = useAppEnv();
  const { storageService } = useService();

  const contextValue = useMemo(() => {
    const params: CreateHttpClientParams & Record<string, unknown> = {
      env,
      storageService,
    };
    const apiProviderValue = {
      authApi: createAuthApi(params),
    } satisfies Record<keyof AllApiRouters, unknown>;

    const apiClient = generateApiClient(value ?? apiProviderValue);

    return {
      apiClient,
      apiRouter: value ?? apiProviderValue,
    };
  }, [env, storageService, value]);

  return <ApiContext value={contextValue}>{children}</ApiContext>;
};

export const useApiRouter = () => {
  const context = use(ApiContext);

  if (context === undefined) {
    throw new Error('useApiRouter must be used within ApiProvider');
  }

  return context.apiRouter;
};

export const useApi = (): AllApiClients => {
  const context = use(ApiContext);

  if (context === undefined) {
    throw new Error('useApi must be used within ApiProvider');
  }

  return context.apiClient;
};
