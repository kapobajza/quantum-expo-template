import i18next from 'i18next';
import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';

import useTranslation from '@/locale/hooks/useTranslation';
import { createStyleSheet, useStyles } from '@/theme/utils/createStyles';

import { TextProps } from './types';
import { buildTextVariants } from './variants';

export const Text = ({
  variant = 'body',
  center,
  style,
  ...props
}: TextProps) => {
  const styles = useStyles(stylesheet);
  const { i18n } = useTranslation();

  return (
    <RNText
      style={[styles.text({ variant, center, dir: i18n.dir() }), style]}
      {...props}
    />
  );
};

const stylesheet = createStyleSheet((theme) => {
  const variants = buildTextVariants(theme);

  return {
    text: ({
      variant,
      center,
      dir,
    }: Required<Pick<TextProps, 'variant'>> &
      Pick<TextProps, 'center'> & {
        dir: ReturnType<(typeof i18next)['dir']>;
      }) => {
      let textAlign: TextStyle['textAlign'] = dir === 'rtl' ? 'right' : 'left';

      if (center) {
        textAlign = 'center';
      }

      return {
        ...variants[variant],
        textAlign,
      };
    },
  };
});
