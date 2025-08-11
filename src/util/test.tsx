import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { Href, usePathname } from 'expo-router';
import { expect, vi } from 'vitest';
import { DeepMockProxy, mock, mockDeep } from 'vitest-mock-extended';

import { ApiProvider } from '@/api';
import { AllApiRouters } from '@/api/provider/types';
import { ToastItemMinimal, ToastProvider } from '@/components/Toast';
import { DatabaseProvider } from '@/db';
import { ConfigRepo, LocaleRepo, QueryRepo } from '@/db/repo';
import { AppEnv, AppEnvProvider } from '@/env';
import { QueryFactoryProvider } from '@/query';
import { AllServices, ServicesProvider } from '@/services/ServiceProvider';
import { StorageService } from '@/services/storageService';
import { ThemeProvider } from '@/theme';

export const buildRenderHook = <Result, Props>(
  fn: (initialProps: Props) => Result,
) => {
  const mockEnv = mock<AppEnv>();
  mockEnv.API_BASE_URL = 'http://localhost:1337/api';
  const mockApiProvider = mockDeep<AllApiRouters>();
  const mockStorageService = mock<StorageService>();
  mockStorageService.setSecureItem.mockResolvedValue();
  let services: AllServices = {
    storageService: mockStorageService,
    loggingService: mockDeep(),
  };
  let apiProvider = mockApiProvider;
  const toastMessages: ToastItemMinimal[] = [];
  const mockShowToast = vi.fn((item: ToastItemMinimal) => {
    toastMessages.push(item);
  });

  return {
    withServices(
      param: Partial<{
        [key in keyof AllServices]: Partial<AllServices[key]>;
      }>,
    ) {
      services = {
        ...services,
        ...param,
      } as AllServices;
      return this;
    },
    withApi(
      param:
        | Partial<AllApiRouters>
        | ((opts: {
            env: AppEnv;
            apiProvider: DeepMockProxy<AllApiRouters>;
          }) => Partial<AllApiRouters>),
    ) {
      const opts =
        typeof param === 'function'
          ? param({ env: mockEnv, apiProvider: mockApiProvider })
          : param;
      apiProvider = {
        ...mockApiProvider,
        ...opts,
      } as DeepMockProxy<AllApiRouters>;

      return this;
    },
    render() {
      const result = renderHook(fn, {
        wrapper({ children }) {
          return (
            <ServicesProvider services={services}>
              <DatabaseProvider
                repository={{
                  localeRepository: mock<LocaleRepo>(),
                  queryRepository: mock<QueryRepo>(),
                  configRepository: mock<ConfigRepo>(),
                }}
              >
                <QueryClientProvider client={new QueryClient()}>
                  <AppEnvProvider config={mockEnv}>
                    <ApiProvider value={apiProvider}>
                      <QueryFactoryProvider>
                        <ThemeProvider>
                          <ToastProvider showToastFn={mockShowToast}>
                            {children}
                          </ToastProvider>
                        </ThemeProvider>
                      </QueryFactoryProvider>
                    </ApiProvider>
                  </AppEnvProvider>
                </QueryClientProvider>
              </DatabaseProvider>
            </ServicesProvider>
          );
        },
      });

      return {
        ...result,
        toastMessages,
        mockShowToast,
      };
    },
  };
};

export const expectToBeOnScreen = (pathname: Href) => {
  const { result } = renderHook(usePathname);
  expect(result.current).toBe(pathname);
};
