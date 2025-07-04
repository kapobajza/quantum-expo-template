import { AppError, ErrorCode } from '@/error';
import { useTranslation } from '@/locale';
import { ErrorCodeTKey } from '@/types/translation';

type TranslatedErrorCode = Extract<
  ErrorCode,
  | 'GENERAL:BAD_REQUEST'
  | 'GENERAL:FORBIDDEN'
  | 'GENERAL:UNAUTHORIZED'
  | 'GENERAL:UNKNOWN'
  | 'OTP:INVALID'
  | 'OTP:EXPIRED'
  | 'GENERAL:VALIDATION'
>;

const errorCodeMap = {
  'GENERAL:BAD_REQUEST': 'badRequestError',
  'GENERAL:FORBIDDEN': 'forbiddenError',
  'GENERAL:UNAUTHORIZED': 'unauthorizedError',
  'GENERAL:UNKNOWN': 'unknownError',
  'GENERAL:VALIDATION': 'validationError',
  'OTP:INVALID': 'invalidOtp',
  'OTP:EXPIRED': 'otpExpired',
} as const satisfies Record<TranslatedErrorCode, ErrorCodeTKey>;

export type MapErrorFn = (error: unknown) => string;

export const useMapError = () => {
  const { t } = useTranslation();

  const mapErrorFn: MapErrorFn = (error) => {
    if (!(error instanceof AppError)) {
      return t('error.general');
    }

    const errorCodeMesageKey = errorCodeMap[
      error.code as TranslatedErrorCode
    ] as ErrorCodeTKey | undefined;

    if (errorCodeMesageKey) {
      return t(`error.code.${errorCodeMesageKey}`);
    }

    return t('error.general');
  };

  return mapErrorFn;
};
