import { get } from 'lodash';
import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppTheme } from '@/theme';
import { ThemeColor } from '@/theme/tokens/colors';
import { ThemeRadius } from '@/theme/tokens/radii';
import { ThemeSpacing } from '@/theme/tokens/spacing';

interface BoxStylingProps
  extends Pick<ViewStyle, 'justifyContent' | 'alignItems'> {
  center?: boolean;
  fill?: boolean;
  margin?: ThemeSpacing;
  padding?: ThemeSpacing;
  marginHorizontal?: ThemeSpacing;
  marginVertical?: ThemeSpacing;
  marginTop?: ThemeSpacing;
  marginBottom?: ThemeSpacing;
  marginLeft?: ThemeSpacing;
  marginRight?: ThemeSpacing;
  marginStart?: ThemeSpacing;
  marginEnd?: ThemeSpacing;
  paddingHorizontal?: ThemeSpacing;
  paddingVertical?: ThemeSpacing;
  paddingTop?: ThemeSpacing;
  paddingBottom?: ThemeSpacing;
  paddingLeft?: ThemeSpacing;
  paddingRight?: ThemeSpacing;
  paddingStart?: ThemeSpacing;
  paddingEnd?: ThemeSpacing;
  backgroundColor?: ThemeColor;
  borderWidth?: number;
  borderColor?: ThemeColor;
  borderRadius?: ThemeRadius;
  gap?: ThemeSpacing;
  flexDirection?: ViewStyle['flexDirection'];
  alignSelf?: ViewStyle['alignSelf'];
  position?: ViewStyle['position'];
  top?: ThemeSpacing;
  bottom?: ThemeSpacing;
  left?: ThemeSpacing;
  right?: ThemeSpacing;
}

export interface BoxProps extends BoxStylingProps {
  style?: ViewProps['style'];
  children?: ViewProps['children'];
}

export const Box = ({ style, children, ...styleProps }: BoxProps) => {
  return <View style={[styles.container(styleProps), style]}>{children}</View>;
};

const generateStyledProps = (theme: AppTheme, styleObj: BoxStylingProps) => {
  return Object.entries(styleObj).reduce<Record<string, unknown>>(
    (
      acc,
      [key, value]: [
        string,
        ThemeSpacing | ThemeColor | ThemeRadius | undefined,
      ],
    ) => {
      if (value === undefined) {
        return acc;
      }

      if (/color/i.exec(key)) {
        acc[key] = get(theme.colors, value);
        return acc;
      }

      if (/radius/i.exec(key)) {
        acc[key] = get(theme.radii, value);
        return acc;
      }

      if (/margin|padding|gap|top|left|right|bottom/i.exec(key)) {
        acc[key] = get(theme.spacing, value);
        return acc;
      }

      acc[key] = value;
      return acc;
    },
    {},
  );
};

const styles = StyleSheet.create((theme) => ({
  container: ({
    center,
    fill,
    justifyContent,
    alignItems,
    alignSelf,
    position,
    ...stylingProps
  }: BoxStylingProps) => {
    const centerJustify: ViewStyle['justifyContent'] = center
      ? 'center'
      : undefined;
    const centerAlign: ViewStyle['alignItems'] = center ? 'center' : undefined;

    return {
      flex: fill ? 1 : undefined,
      justifyContent: centerJustify ?? justifyContent,
      alignItems: centerAlign ?? alignItems,
      alignSelf,
      position,
      ...generateStyledProps(theme, stylingProps),
    };
  },
}));
