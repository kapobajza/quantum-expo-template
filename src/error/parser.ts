import { isAxiosError } from 'axios';
import { z } from 'zod';

import { AppError } from './AppError';
import { ErrorCode, errorDataSchema } from './types';

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

export const parseError = (error: unknown) => {
  let data: unknown = undefined;

  if (isAxiosError(error)) {
    data = error.response?.data;
  } else if (isAppError(error)) {
    data = error;
  }

  const parsed = errorDataSchema.safeParse(data);

  if (!parsed.success) {
    return undefined;
  }

  return parsed.data;
};

export const isErrorCode = (error: unknown, ...codes: ErrorCode[]): boolean => {
  const parsedData = parseError(error);

  if (!parsedData) {
    return false;
  }

  return codes.includes(parsedData.error_code);
};

export const parseErrorResponseData = <TSchema extends z.Schema>(
  error: unknown,
  code: ErrorCode,
  schema: TSchema,
): TSchema['_output'] | undefined => {
  const errorData = parseError(error);

  if (!errorData) {
    return undefined;
  }

  if (errorData.error_code !== code) {
    return undefined;
  }

  const parsedData = schema.safeParse(errorData.data);

  if (!parsedData.success) {
    return undefined;
  }

  return parsedData.data as unknown;
};
