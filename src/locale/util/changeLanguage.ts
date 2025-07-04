import { i18n } from 'i18next';

import { LocaleRepo } from '@/db/repo/localeRepo';
import { UserLocale } from '@/locale/types';

export const changeLanguage = async ({
  newLocale,
  i18n,
  localeRepository,
}: {
  newLocale: UserLocale;
  i18n: i18n;
  localeRepository: LocaleRepo;
}) => {
  await localeRepository.setLocale(newLocale);
  await i18n.changeLanguage(newLocale.code);
};
