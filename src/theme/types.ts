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
