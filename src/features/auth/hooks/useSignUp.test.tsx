import { waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';

import { AllApiRouters } from '@/api';
import { buildRenderHook } from '@/util';

import { useSignUp } from './useSignUp';

describe('useSignUp hook', () => {
  test('should show message on success', async () => {
    const authApi = mockDeep<AllApiRouters['authApi']>();
    authApi.signUp.mockReturnValue({
      route: '',
      path: 'signup',
      url: '',
      request: vi.fn().mockResolvedValue({ data: {} }),
    });
    const { result, toastMessages } = buildRenderHook(useSignUp)
      .withApi({
        authApi,
      })
      .render();

    result.current.mutate({
      email: 'test@example.com',
      password: 'password123',
      repeatPassword: 'password123',
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBe(true);
    expect(toastMessages).toHaveLength(1);
    expect(toastMessages[0].message).toBe('signUp.successMessage');
  });
});
