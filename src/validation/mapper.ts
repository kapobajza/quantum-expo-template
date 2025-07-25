import { z } from 'zod';

import { TranslationFn, ValidationFieldTKey } from '@/types/translation';

import { buildValidationContext } from './builder';

export function mapValidationErrors(t: TranslationFn) {
  z.setErrorMap((issue) => {
    const { messageKey, min } = buildValidationContext(issue) ?? {};

    if (!messageKey) {
      return {
        message: t('validation.messages.other'),
      };
    }

    return {
      message: t(`validation.messages.${messageKey}`, {
        field: t(`validation.fields.${issue.path[0] as ValidationFieldTKey}`),
        min,
      }),
    };
  });
}
