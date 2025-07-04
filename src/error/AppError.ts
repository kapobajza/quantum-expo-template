import { ErrorCode } from './types';

export class AppError extends Error {
  code: ErrorCode;

  constructor(code: ErrorCode) {
    super(`An error occurred with code: ${code}`);
    this.code = code;
  }
}
