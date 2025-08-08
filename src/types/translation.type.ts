// This file is auto-generated, you shouldn't modify it manually

export interface TranslationKeyParam {
  'validation.fields.email': undefined;
  'validation.fields.password': undefined;
  'validation.fields.repeatPassword': undefined;
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
  'validation.messages.repeatPassword': undefined;
  'general.submit': undefined;
  'general.cancel': undefined;
  'general.confirm': undefined;
  'general.ok': undefined;
  'general.back': undefined;
  'general.areYouSure': undefined;
  'general.noResults': undefined;
  'error.general': undefined;
  'error.code.email_not_confirmed': undefined;
  'error.code.invalid_credentials': undefined;
  'error.code.missing_app_schema': undefined;
  'error.code.over_email_send_rate_limit': undefined;
  'signUp.title': undefined;
  'signUp.successMessage': undefined;
  'login.dontHaveAccount': undefined;
  'emailConfirmed.title': undefined;
  'emailConfirmed.message': undefined;
  'emailConfirmed.backToLogin': undefined;
  'home.logOut': undefined;
  'changeLanguage.title': undefined;
  'changeLanguage.languageName': {
    code: 'en' | 'de';
  };
  'changeLanguage.alertMessage': {
    language: string | number | undefined;
  };
}

export type TranslationKey = keyof TranslationKeyParam;
