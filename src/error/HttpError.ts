import { AppError } from './AppError';
import { ErrorCode } from './types';

export class HttpError extends AppError {
  status: number;
  code: ErrorCode;
  data: unknown;

  constructor(
    status = 500,
    code: ErrorCode = ErrorCode.GeneralUnknown,
    data?: unknown,
  ) {
    super(code);
    this.status = status;
    this.code = code;
    this.data = data;
  }
}
