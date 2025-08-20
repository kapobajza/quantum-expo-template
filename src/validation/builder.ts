import {
  $ZodIssue,
  $ZodIssueCustom,
  $ZodIssueInvalidStringFormat,
  $ZodIssueInvalidType,
  $ZodIssueTooBig,
  $ZodIssueTooSmall,
  $ZodRawIssue,
} from 'zod/v4/core';

import { ValidationMessageTKey } from '@/types/translation';

import { CustomValidationCode } from './types';

type ExistingValidator = Extract<
  $ZodIssue['code'],
  'invalid_format' | 'too_small' | 'invalid_type' | 'too_big' | 'custom'
>;

type ValidatorFn<TIssue extends $ZodIssue = $ZodIssue> = (
  issue: $ZodRawIssue<TIssue>,
) =>
  | {
      messageKey: ValidationMessageTKey | undefined;
      min?: number | bigint;
      value?: number | bigint;
    }
  | undefined;

const minValidator: ValidatorFn<$ZodIssueTooSmall> = (issue) => {
  if (issue.origin === 'string' && issue.minimum === 1) {
    return { messageKey: 'required' };
  }

  return { messageKey: 'min', min: issue.minimum };
};

const invalidStringValidator: ValidatorFn<$ZodIssueInvalidStringFormat> = (
  issue,
) => {
  if (issue.format === 'email') {
    return { messageKey: 'email' };
  }

  return { messageKey: 'required' };
};

const invalidTypeValidator: ValidatorFn<$ZodIssueInvalidType> = (issue) => {
  if (issue.expected === 'string') {
    return { messageKey: 'required' };
  }
};

const tooBigValidator: ValidatorFn<$ZodIssueTooBig> = (issue) => {
  if (issue.origin === 'string') {
    return { messageKey: 'max', value: issue.maximum };
  }
};

const customValidator: ValidatorFn<$ZodIssueCustom> = (issue) => {
  if (issue.params?.code === CustomValidationCode.RepeatPassword) {
    return { messageKey: 'repeatPassword' };
  }
};

const validators = {
  invalid_format: invalidStringValidator,
  invalid_type: invalidTypeValidator,
  too_small: minValidator,
  too_big: tooBigValidator,
  custom: customValidator,
} as const satisfies Record<ExistingValidator, ValidatorFn<never>>;

export function buildValidationContext(issue: $ZodRawIssue) {
  const validatorFn = validators[issue.code as ExistingValidator] as
    | ValidatorFn
    | undefined;
  return validatorFn?.(issue);
}
