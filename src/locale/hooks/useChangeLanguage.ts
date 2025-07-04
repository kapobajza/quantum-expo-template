import { useState } from 'react';

import { useDatabaseRepo } from '@/db/context';
import { UserLocale } from '@/locale/types';
import { changeLanguage as changeLanguageAsync } from '@/locale/util/changeLanguage';

import { useI18nTranslation } from './useI18nTranslation';

const useChangeLanguage = () => {
  const { localeRepository } = useDatabaseRepo();
  const [isLoading, setIsLoading] = useState(false);
  const { i18n } = useI18nTranslation();

  const changeLanguage = (newLocale: UserLocale) => {
    void (async () => {
      setIsLoading(true);

      try {
        await changeLanguageAsync({
          newLocale,
          i18n,
          localeRepository,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return {
    changeLanguage,
    isLoading,
  };
};

export default useChangeLanguage;
