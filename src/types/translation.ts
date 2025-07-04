import { TOptionsBase } from 'i18next';

import { TranslationKey, TranslationKeyParam } from './translation.type';

export type TranslationFn = <
  TKey extends TranslationKey,
  TParams extends TranslationKeyParam[TKey],
>(
  ...args: TParams extends undefined
    ? [key: TKey] | [key: TKey, TOptionsBase]
    : [key: TKey, TParams & TOptionsBase]
) => string;

type ExtractTranslationKey<
  TKey extends string,
  TTranslations extends string,
> = TTranslations extends `${TKey}.${infer Field}` ? Field : never;

export type ValidationFieldTKey = ExtractTranslationKey<
  'validation.fields',
  TranslationKey
>;

export type ValidationMessageTKey = ExtractTranslationKey<
  'validation.messages',
  TranslationKey
>;

export type ErrorCodeTKey = ExtractTranslationKey<'error.code', TranslationKey>;
