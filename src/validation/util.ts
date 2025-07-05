import { z } from 'zod';

import { ValidationFieldTKey } from '@/types/translation';

import { CustomValidationCode } from './types';

export const createValidationSchema = <
  T extends Partial<Record<ValidationFieldTKey, z.ZodTypeAny>>,
>(
  obj: T & Record<Exclude<keyof T, ValidationFieldTKey>, never>,
) => {
  return z.object(obj);
};

export const createCustomSchemaParams = (code: CustomValidationCode) => {
  return {
    params: {
      code,
    },
  };
};
