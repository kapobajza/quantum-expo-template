import { StyleSheet } from 'react-native-unistyles';

import { shadows } from './tokens/ahdows';
import { darkThemeColors, lightThemeColors } from './tokens/colors';
import { radii } from './tokens/radii';
import { spacing as spacingTokens } from './tokens/spacing';
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  typography,
} from './tokens/typography';
import { zIndex } from './tokens/zIndex';
import { AppTheme } from './types';
import { addColorTransparency } from './utils/color';

const spacing: AppTheme['spacing'] = (v) => {
  if (typeof v === 'string') {
    return spacingTokens[v];
  }

  return v * 4;
};

const themeDefaults: Omit<AppTheme, 'colors'> = {
  spacing,
  shadows,
  radii,
  typography,
  addColorTransparency,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  zIndex,
};

const lightTheme: AppTheme = {
  colors: lightThemeColors,
  ...themeDefaults,
};

const darkTheme: AppTheme = {
  colors: darkThemeColors,
  ...themeDefaults,
};

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    initialTheme: 'light',
  },
  breakpoints,
  themes: appThemes,
});
