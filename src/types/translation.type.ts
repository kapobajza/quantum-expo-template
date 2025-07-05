// This file is auto-generated, you shouldn't modify it manually

export interface TranslationKeyParam {
  'validation.fields.email': undefined;
  'validation.fields.firstName': undefined;
  'validation.fields.lastName': undefined;
  'validation.fields.password': undefined;
  'validation.messages.required': {
    field: string | number | undefined;
  };
  'validation.messages.other': undefined;
  'validation.messages.email': undefined;
  'validation.messages.min': {
    field: string | number | undefined;
    min: string | number | undefined;
  };
  'validation.messages.max': {
    field: string | number | undefined;
    value: string | number | undefined;
  };
  'general.submit': undefined;
  'general.cancel': undefined;
  'general.confirm': undefined;
  'general.ok': undefined;
  'general.back': undefined;
  'error.general': undefined;
  'error.code.badRequestError': undefined;
  'error.code.unauthorizedError': undefined;
  'error.code.forbiddenError': undefined;
  'error.code.unknownError': undefined;
  'error.code.validationError': undefined;
}

export type TranslationKey = keyof TranslationKeyParam;
