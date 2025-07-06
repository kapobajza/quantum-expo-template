import {
  ZodCustomIssue,
  ZodInvalidStringIssue,
  ZodInvalidTypeIssue,
  ZodIssueCode,
  ZodIssueOptionalMessage,
  ZodParsedType,
  ZodTooBigIssue,
  ZodTooSmallIssue,
} from 'zod';

import { ValidationMessageTKey } from '@/types/translation';

import { CustomValidationCode } from './types';

type ExistingValidator = Extract<
  ZodIssueCode,
  'invalid_string' | 'too_small' | 'invalid_type' | 'too_big' | 'custom'
>;

type ValidatorFn<
  TIssue extends ZodIssueOptionalMessage = ZodIssueOptionalMessage,
> = (issue: TIssue) =>
  | {
      messageKey: ValidationMessageTKey | undefined;
      min?: number | bigint;
      value?: number | bigint;
    }
  | undefined;

const minValidator: ValidatorFn<ZodTooSmallIssue> = (issue) => {
  if (issue.type === 'string' && issue.minimum === 1) {
    return { messageKey: 'required' };
  }

  return { messageKey: 'min', min: issue.minimum };
};

const invalidStringValidator: ValidatorFn<ZodInvalidStringIssue> = (issue) => {
  if (issue.validation === 'email') {
    return { messageKey: 'email' };
  }

  return { messageKey: 'required' };
};

const invalidTypeValidator: ValidatorFn<ZodInvalidTypeIssue> = (issue) => {
  if (issue.expected === ZodParsedType.string) {
    return { messageKey: 'required' };
  }
};

const tooBigValidator: ValidatorFn<ZodTooBigIssue> = (issue) => {
  if (issue.type === 'string') {
    return { messageKey: 'max', value: issue.maximum };
  }
};

const customValidator: ValidatorFn<ZodCustomIssue> = (issue) => {
  if (issue.params?.code === CustomValidationCode.RepeatPassword) {
    return { messageKey: 'repeatPassword' };
  }
};

const validators = {
  invalid_string: invalidStringValidator,
  invalid_type: invalidTypeValidator,
  too_small: minValidator,
  too_big: tooBigValidator,
  custom: customValidator,
} as const satisfies Record<ExistingValidator, ValidatorFn<never>>;

export function buildValidationContext(issue: ZodIssueOptionalMessage) {
  const validatorFn = validators[issue.code as ExistingValidator] as
    | ValidatorFn
    | undefined;
  return validatorFn?.(issue);
}
