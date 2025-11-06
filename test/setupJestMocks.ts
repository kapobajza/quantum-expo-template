import { vi } from 'vitest';

vi.stubGlobal('jest', {
  mock: vi.mock.bind(vi),
});
