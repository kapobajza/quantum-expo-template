import { colors } from '@/theme/tokens/colors';
import { radii } from '@/theme/tokens/radii';
import { spacing } from '@/theme/tokens/spacing';
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from '@/theme/tokens/typography';
import { zIndex } from '@/theme/tokens/zIndex';

import { addColorTransparency } from './utils/color';

export const defaultTheme = {
  colors,
  spacing,
  zIndex,
  fontSize,
  fontWeight,
  lineHeight,
  radii,
  fontFamily,
  addColorTransparency,
} as const;

export type AppTheme = typeof defaultTheme;
