export const UserLocale = {
  English: {
    code: 'en',
    tag: 'en-US',
  },
  German: {
    code: 'de',
    tag: 'de-DE',
  },
  // Add more locales as needed
} as const satisfies Record<string, { code: string; tag: string }>;

export type UserLocale = (typeof UserLocale)[keyof typeof UserLocale];

export type UserLocaleCode = UserLocale['code'];

export type UserLocaleTag = UserLocale['tag'];

export const LocaleNamespace = {
  Default: 'translation',
} as const;

export type LocaleNamespace =
  (typeof LocaleNamespace)[keyof typeof LocaleNamespace];
