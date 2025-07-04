import * as Localization from 'expo-localization';
import i18n from 'i18next';
import ICU from 'i18next-icu';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { useState } from 'react';
import { initReactI18next } from 'react-i18next';

import { useDatabaseRepo } from '@/db/context';
import de from '@/locale/resources/de.json';
import en from '@/locale/resources/en.json';
import { LocaleNamespace, UserLocale } from '@/locale/types';
import { changeLanguage } from '@/locale/util/changeLanguage';
import { useService } from '@/services';

const useSetupLocale = () => {
  const { localeRepository } = useDatabaseRepo();
  const { loggingService } = useService();
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<typeof i18n>();

  return {
    data,
    isPending,
    mutate: async () => {
      try {
        const locales = Localization.getLocales();
        let currentLocale: UserLocale = UserLocale.English;

        try {
          let locale = await localeRepository.getLocale();

          if (!locale) {
            const userLocale =
              locales
                .map(
                  (locale) =>
                    ({
                      code: locale.languageCode ?? UserLocale.English.code,
                      tag: locale.languageTag,
                    }) as UserLocale,
                )
                .find((locale) => {
                  return Object.values(UserLocale).some(
                    (userLocale) => userLocale.code === locale.code,
                  );
                }) ?? UserLocale.English;

            locale = (await localeRepository.setLocale(userLocale))[0];
          }

          currentLocale = locale as UserLocale;
        } catch (error) {
          loggingService.captureException(error);
        }

        // eslint-disable-next-line import-x/no-named-as-default-member
        await i18n
          .use(initReactI18next)
          .use(ICU)
          .use(intervalPlural)
          .init({
            compatibilityJSON: 'v4',
            fallbackLng: UserLocale.English.code,
            react: {
              bindI18n: 'languageChanged',
            },
          });

        i18n.addResourceBundle(
          UserLocale.English.code,
          LocaleNamespace.Default,
          en,
          false,
          true,
        );
        i18n.addResourceBundle(
          UserLocale.German.code,
          LocaleNamespace.Default,
          de,
          false,
          true,
        );

        try {
          await changeLanguage({
            i18n,
            localeRepository,
            newLocale: currentLocale,
          });
        } catch (error) {
          loggingService.captureException(error);
        }

        setData(i18n);
      } finally {
        setIsPending(false);
      }
    },
  };
};

export default useSetupLocale;
