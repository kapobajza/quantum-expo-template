import { Href } from 'expo-router';
import { ReactNode, Ref } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

import { ThemeColor } from '@/theme/tokens/colors';
import { FontWeight, TypographyVariant } from '@/theme/tokens/typography';

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  center?: boolean;
  ref?: Ref<RNText>;
  color?: ThemeColor;
  fontWeight?: FontWeight;
}

export type BaseParseShape = Pick<
  TextProps,
  Exclude<keyof TextProps, 'onPress' | 'onLongPress'>
> & {
  renderText?: (matchingString: string, matches: string[]) => ReactNode;
  onPress?: (text: string, index: number) => void;
  onLongPress?: (text: string, index: number) => void;
  removeMatchingTags?: boolean;
};

export type DefaultParseShape = BaseParseShape & {
  type: 'url' | 'phone' | 'email';
};

export type CustomParseShape = BaseParseShape & {
  pattern: RegExp;
  nonExhaustiveModeMaxMatchCount?: number;
  href?: Href;
};

export type ParseShape = DefaultParseShape | CustomParseShape;

export type ParsedTextProps = TextProps & {
  parse?: ParseShape[];
  childrenProps?: TextProps;
};
