import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { AppTheme } from '@/theme/default';

type RNStyle = ViewStyle | TextStyle | ImageStyle;

export type RNNamedStyles = Record<string, RNStyle>;

type StyledParamFn<TReturnValue> = (...args: never[]) => TReturnValue;

export type NamedStyles = {
  [key in keyof RNNamedStyles]:
    | RNNamedStyles[key]
    | StyledParamFn<RNNamedStyles[key]>;
};

export type ExtractStyles<TStyleSheet> = TStyleSheet extends (
  theme: AppTheme,
) => infer R
  ? {
      [K in keyof R]: R[K];
    }
  : TStyleSheet extends NamedStyles
    ? {
        [key in keyof TStyleSheet]: TStyleSheet[key];
      }
    : never;
