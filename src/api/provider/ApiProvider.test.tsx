import axios from 'axios';
import { describe, expect, test, vi } from 'vitest';
import { mock, mockDeep } from 'vitest-mock-extended';

import { createAuthApi } from '@/api/auth.api';
import { AppEnv } from '@/env';
import { StorageService } from '@/services';
import { buildRenderHook } from '@/util/test';

import { useApi, useApiRouter } from './ApiProvider';
import { AllApiRouters } from './types';

describe('ApiProvider hooks', () => {
  test('useApi should return api with request methods', async () => {
    const mockAuthApi = mockDeep<AllApiRouters['authApi']>();
    mockAuthApi.login.mockReturnValue({
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

    expect(result.current.authApi.login).toBeDefined();
    await expect(result.current.authApi.login({})).resolves.toEqual({
      data: 'success',
    });
  });

  test('useApiRouter should return correct url and route path', () => {
    const mockEnv = mock<AppEnv>({
      API_URL: 'http://localhost:3333/api/v1',
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
        }),
      })
      .render();

    const authApi = result.current.authApi.login({});
    expect(authApi.route).toEqual('auth/login');
    expect(authApi.url).toEqual('http://localhost:3333/api/v1/auth/login');
  });
});
