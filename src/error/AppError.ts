import { ErrorCode } from './types';

export class AppError extends Error {
  code: ErrorCode;
  originalError?: unknown;
  data?: unknown;

  constructor({
    code,
    originalError,
    data,
  }: {
    code: ErrorCode;
    originalError?: unknown;
    data?: unknown;
  }) {
    super(`An error occurred with code: ${code}`);
    this.code = code;
    this.originalError = originalError;
    this.data = data;
  }
}
