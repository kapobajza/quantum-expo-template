import { renderHook } from '@testing-library/react';
import { AxiosError, AxiosResponse } from 'axios';
import { describe, expect, test } from 'vitest';

import { AppError } from '@/error/AppError';
import { ErrorCode } from '@/error/types';

import { useMapError } from './useMapError';

function createAxiosError(code: ErrorCode) {
  return new AxiosError('message', 'code', undefined, undefined, {
    data: {
      code,
    },
  } as AxiosResponse);
}

describe('useMapError hook', () => {
  test('should map axios error to a user-friendly message', () => {
    const { result } = renderHook(useMapError);

    expect(
      result.current(createAxiosError(ErrorCode.OverEmailSendRateLimit)),
    ).toBe('error.code.over_email_send_rate_limit');
    expect(result.current(createAxiosError(ErrorCode.EmailNotConfirmed))).toBe(
      'error.code.email_not_confirmed',
    );
  });

  test('should map AppError to a user-friendly message', () => {
    const { result } = renderHook(useMapError);

    expect(
      result.current(
        new AppError({
          code: ErrorCode.MissingAppSchema,
        }),
      ),
    ).toBe('error.code.missing_app_schema');
    expect(
      result.current(
        new AppError({
          code: ErrorCode.EmailNotConfirmed,
        }),
      ),
    ).toBe('error.code.email_not_confirmed');
  });

  test('should return a generic error message for unknown errors', () => {
    const { result } = renderHook(useMapError);

    expect(result.current(new Error('Unknown error'))).toBe('error.general');
  });
});
