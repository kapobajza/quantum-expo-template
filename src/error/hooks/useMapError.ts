import { ErrorCode, parseError } from '@/error';
import { useTranslation } from '@/locale';
import { ErrorCodeTKey } from '@/types/translation';

type TranslatedErrorCode = Extract<
  ErrorCode,
  | 'email_not_confirmed'
  | 'invalid_credentials'
  | 'missing_app_schema'
  | 'over_email_send_rate_limit'
>;

const errorCodeMap = {
  email_not_confirmed: 'email_not_confirmed',
  invalid_credentials: 'invalid_credentials',
  missing_app_schema: 'missing_app_schema',
  over_email_send_rate_limit: 'over_email_send_rate_limit',
} as const satisfies Record<TranslatedErrorCode, ErrorCodeTKey>;

export type MapErrorFn = (error: unknown) => string;

export const useMapError = () => {
  const { t } = useTranslation();

  const mapErrorFn: MapErrorFn = (error) => {
    const parsedError = parseError(error);

    if (!parsedError) {
      return t('error.general');
    }

    const errorCodeMesageKey = errorCodeMap[
      parsedError.code as TranslatedErrorCode
    ] as ErrorCodeTKey | undefined;

    if (errorCodeMesageKey) {
      return t(`error.code.${errorCodeMesageKey}`);
    }

    return t('error.general');
  };

  return mapErrorFn;
};
