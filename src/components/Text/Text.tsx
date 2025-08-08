import _ from 'lodash';
import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

import { createStyleSheet, useStyles } from '@/theme/utils/createStyles';

import { TextProps } from './types';

export const Text = ({
  variant = 'body.regular',
  center,
  style,
  color,
  fontWeight,
  ...props
}: TextProps) => {
  const styles = useStyles(stylesheet);

  return (
    <RNText
      style={StyleSheet.flatten([
        styles.text({ variant, center, color, fontWeight }),
        style,
      ])}
      {...props}
    />
  );
};

const stylesheet = createStyleSheet((theme) => {
  return {
    text: ({
      variant,
      center,
      color,
      fontWeight,
    }: Required<Pick<TextProps, 'variant'>> &
      Pick<TextProps, 'center' | 'color' | 'fontWeight'>) => {
      const variantStyle = _.get(theme.typography, variant);
      const weight = fontWeight ?? variantStyle.fontWeight;

      return {
        ...variantStyle,
        textAlign: center ? 'center' : 'left',
        fontFamily: theme.fontFamily.spaceMono,
        color: _.get(theme.colors, color ?? 'background.text.main'),
        fontWeight: weight,
      };
    },
  };
});
