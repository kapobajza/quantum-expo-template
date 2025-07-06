import { z } from 'zod';

import { HttpError } from './HttpError';
import { ErrorCode, errorDataSchema } from './types';

export const isHttpError = (error: unknown): error is HttpError => {
  return error instanceof HttpError;
};

export const isErrorCode = (error: unknown, ...codes: ErrorCode[]): boolean => {
  const parsed = errorDataSchema.safeParse(error);

  if (!parsed.success) {
    return false;
  }

  return codes.includes(parsed.data.error_code);
};

export const parseErrorData = <TSchema extends z.Schema>(
  error: unknown,
  code: ErrorCode,
  schema: TSchema,
): TSchema['_output'] | undefined => {
  if (!isHttpError(error)) {
    return undefined;
  }

  if (error.code !== code) {
    return undefined;
  }

  const parsedData = schema.safeParse(error.data);

  if (!parsedData.success) {
    return undefined;
  }

  return parsedData.data as unknown;
};
