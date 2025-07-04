import { useTranslation } from 'react-i18next';

export const useI18nTranslation = () => {
  return useTranslation(undefined, {
    useSuspense: false,
  });
};
