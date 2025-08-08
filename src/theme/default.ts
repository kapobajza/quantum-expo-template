import { lightThemeColors } from '@/theme/tokens/colors';
import { radii } from '@/theme/tokens/radii';
import { spacing } from '@/theme/tokens/spacing';
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  typography,
} from '@/theme/tokens/typography';
import { zIndex } from '@/theme/tokens/zIndex';

import { shadows } from './tokens/ahdows';
import { addColorTransparency } from './utils/color';

export const defaultTheme = {
  colors: lightThemeColors,
  spacing,
  zIndex,
  fontSize,
  fontWeight,
  lineHeight,
  radii,
  fontFamily,
  typography,
  addColorTransparency,
  shadows,
} as const;

export type AppTheme = typeof defaultTheme;
