import { waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';

import { AllApiRouters } from '@/api';
import { buildRenderHook, expectToBeOnScreen } from '@/util';

import { useSignIn } from './useSignIn';

describe('useSignIn hook', () => {
  test('should navigate to home on success', async () => {
    const authApi = mockDeep<AllApiRouters['authApi']>();
    authApi.signIn.mockReturnValue({
      route: '',
      path: 'token',
      url: '',
      request: vi.fn().mockResolvedValue({ data: { access_token: 'token' } }),
    });
    const { result } = buildRenderHook(useSignIn)
      .withApi({
        authApi,
      })
      .render();

    result.current.mutate({
      email: 'test@example.com',
      password: 'password123',
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBe(true);
    expectToBeOnScreen('/(app)');
  });
});
