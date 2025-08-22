import { UnistylesThemes } from 'react-native-unistyles';

import { ObjectValues } from '@/types';

import { shadows } from './tokens/ahdows';
import { darkThemeColors, lightThemeColors } from './tokens/colors';
import { radii } from './tokens/radii';
import { spacing } from './tokens/spacing';
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  Typography,
} from './tokens/typography';
import { zIndex } from './tokens/zIndex';
import { addColorTransparency } from './utils/color';

export interface AppTheme {
  colors: typeof lightThemeColors | typeof darkThemeColors;
  spacing: (v: number | keyof typeof spacing) => number;
  shadows: typeof shadows;
  radii: typeof radii;
  typography: Typography;
  zIndex: typeof zIndex;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  lineHeight: typeof lineHeight;
  fontFamily: typeof fontFamily;
  addColorTransparency: typeof addColorTransparency;
}

export const ThemeAppearance = {
  Light: 'light',
  Dark: 'dark',
  System: 'system',
} satisfies Record<string, keyof UnistylesThemes | 'system'>;

export type ThemeAppearance = ObjectValues<typeof ThemeAppearance>;

export type UpdateThemeParam =
  | ThemeAppearance
  | ((prev: ThemeAppearance | undefined) => ThemeAppearance);
