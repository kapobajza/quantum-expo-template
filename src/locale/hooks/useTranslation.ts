import { TFunction } from 'i18next';
import { useTranslation as useReactI18nextTranslation } from 'react-i18next';

import { TranslationFn } from '@/types/translation';

type TFunctionPiped = (t: TFunction) => TranslationFn;

const translationFn: TFunctionPiped =
  (tfn) =>
  (...args) => {
    const [key, params] = args;
    // @ts-expect-error - it's hard to infer the proper select type with our custom generic types
    return tfn(key, params);
  };

const useTranslation = () => {
  const { t, i18n, ready } = useReactI18nextTranslation(undefined, {
    useSuspense: false,
  });

  return {
    t: translationFn(t),
    i18n,
    ready,
  };
};

export default useTranslation;
