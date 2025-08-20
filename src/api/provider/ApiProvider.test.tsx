import axios from 'axios';
import { describe, expect, test, vi } from 'vitest';
import { mock, mockDeep } from 'vitest-mock-extended';

import { createAuthApi } from '@/api/auth.api';
import { AppEnv } from '@/env';
import { LoggingService, StorageService } from '@/services';
import { buildRenderHook } from '@/util/test';

import { useApi, useApiRouter } from './ApiProvider';
import { AllApiRouters } from './types';

describe('ApiProvider hooks', () => {
  test('useApi should return api with request methods', async () => {
    const mockAuthApi = mockDeep<AllApiRouters['authApi']>();
    mockAuthApi.signUp.mockReturnValue({
      request: vi.fn().mockResolvedValue({ data: 'success' }),
      path: 'login',
      route: '',
      url: '',
    });

    const { result } = buildRenderHook(useApi)
      .withApi({
        authApi: mockAuthApi,
      })
      .render();

    expect(result.current.authApi.signUp).toBeDefined();
    await expect(
      result.current.authApi.signUp({
        email: '',
        password: '',
        repeatPassword: '',
      }),
    ).resolves.toEqual({
      data: 'success',
    });
  });

  test('useApiRouter should return correct url and route path', () => {
    const mockEnv = mock<AppEnv>({
      API_BASE_URL: 'http://localhost:3333/api/v1',
    });

    const { result } = buildRenderHook(useApiRouter)
      .withApi({
        authApi: createAuthApi({
          env: mockEnv,
          storageService: mock<StorageService>(),
          createHttpInstance(baseURL) {
            return axios.create({
              baseURL,
            });
          },
          loggerService: mock<LoggingService>(),
        }),
      })
      .render();

    const authApi = result.current.authApi.signUp({
      email: '',
      password: '',
      repeatPassword: '',
    });
    expect(authApi.route).toEqual('auth/v1/signup');
    expect(authApi.url).toEqual(
      'http://localhost:3333/api/v1/auth/v1/signup?redirect_to=my-app%3A%2F%2Fauth%2Femail-confirmed',
    );
  });
});
