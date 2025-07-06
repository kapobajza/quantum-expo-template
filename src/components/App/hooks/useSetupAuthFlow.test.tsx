import { waitFor } from '@testing-library/dom';
import { describe, expect, test, vi } from 'vitest';

import { buildRenderHook } from '@/util';

import useSetupAuthFlow from './useSetupAuthFlow';

describe('useSetupAuthFlow', () => {
  test('should succeed if token is present', async () => {
    const { result } = buildRenderHook(useSetupAuthFlow)
      .withApi(({ apiProvider }) => {
        apiProvider.authApi.getMe.mockReturnValue({
          path: 'user',
          request: vi.fn().mockResolvedValue({ data: {} }),
          route: '',
          url: '',
        });
        return apiProvider;
      })
      .withServices({
        storageService: vi.mocked({
          getSecureItem: vi.fn().mockResolvedValue({
            token: '123',
          }),
        }),
      })
      .render();

    result.current.mutate();

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('should throw if token is not present', async () => {
    const { result } = buildRenderHook(useSetupAuthFlow)
      .withServices({
        storageService: vi.mocked({
          getSecureItem: vi.fn().mockResolvedValue(null),
        }),
      })
      .render();

    result.current.mutate();

    await waitFor(() => result.current.isError);

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBeDefined();
  });

  test('should throw if endpoint me throws', async () => {
    const { result } = buildRenderHook(useSetupAuthFlow)
      .withApi(({ apiProvider }) => {
        apiProvider.authApi.getMe.mockReturnValue({
          path: 'user',
          request: vi.fn().mockRejectedValue(new Error('error')),
          route: '',
          url: '',
        });
        return apiProvider;
      })
      .withServices({
        storageService: vi.mocked({
          getSecureItem: vi.fn().mockResolvedValue({
            token: '123',
          }),
        }),
      })
      .render();

    result.current.mutate();

    await waitFor(() => result.current.isError);

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBeDefined();
  });
});
