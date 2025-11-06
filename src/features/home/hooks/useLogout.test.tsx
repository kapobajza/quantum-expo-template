import { waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';

import { AllApiRouters } from '@/api';
import { RouteName } from '@/constants/route';
import { buildRenderHook, expectToBeOnScreen } from '@/util';

import { useLogout } from './useLogout';

describe('useLogout hook', () => {
  test('should show message on success', async () => {
    const authApi = mockDeep<AllApiRouters['authApi']>();
    authApi.signOut.mockReturnValue({
      route: '',
      path: 'logout',
      url: '',
      request: vi.fn().mockResolvedValue({ data: {} }),
    });
    const { result } = buildRenderHook(useLogout)
      .withApi({
        authApi,
      })
      .render();

    result.current.mutate();

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBe(true);
    expectToBeOnScreen(RouteName.Auth.Login);
  });
});
