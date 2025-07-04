import { I18nextProvider } from 'react-i18next';

import useMountEffect from '@/hooks/useMountEffect';

import useSetupLocale from './hooks/useSetupLocale';

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const { mutate: setupLocale, isPending, data: i18n } = useSetupLocale();

  useMountEffect(() => {
    void setupLocale();
  });

  if (isPending || !i18n) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
