import { TextStyle } from 'react-native';

import { AppTheme } from '@/theme';

export const buildTextVariants = (theme: AppTheme) => {
  return {
    h1: {
      fontWeight: theme.fontWeight[700],
      fontSize: theme.fontSize['28'],
      lineHeight: theme.lineHeight['32'],
    },
    h2: {
      fontWeight: theme.fontWeight[700],
      fontSize: theme.fontSize['26'],
      lineHeight: theme.lineHeight['30'],
    },
    h3: {
      fontWeight: theme.fontWeight['700'],
      fontSize: theme.fontSize['22'],
      lineHeight: theme.lineHeight['26'],
    },
    h4: {
      fontWeight: theme.fontWeight['600'],
      fontSize: theme.fontSize['20'],
      lineHeight: theme.lineHeight['26'],
    },
    h5: {
      fontWeight: theme.fontWeight['700'],
      fontSize: theme.fontSize['18'],
      lineHeight: theme.lineHeight['24'],
    },
    h6: {
      fontWeight: theme.fontWeight['700'],
      fontSize: theme.fontSize['16'],
      lineHeight: theme.lineHeight['22'],
    },
    body: {
      fontWeight: theme.fontWeight['400'],
      fontSize: theme.fontSize['14'],
      lineHeight: theme.lineHeight['20'],
    },
    emphasis: {
      fontWeight: theme.fontWeight['700'],
      fontSize: theme.fontSize['14'],
      lineHeight: theme.lineHeight['20'],
    },
  } satisfies Record<
    string,
    Pick<TextStyle, 'fontWeight' | 'fontSize' | 'lineHeight'>
  >;
};

export type TextVariant = keyof ReturnType<typeof buildTextVariants>;
