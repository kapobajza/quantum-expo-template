import { SvgProps } from 'react-native-svg';

import { ThemeColors } from '@/theme/tokens/colors';
import { ThemeSpacingAbsolute } from '@/theme/tokens/spacing';

import * as iconName from './raw';

export type IconName = keyof typeof iconName;

export interface IconProps
  extends Omit<SvgProps, 'width' | 'height' | 'color'> {
  name: IconName;
  /** width in theme spacing, x4 */
  width?: ThemeSpacingAbsolute;
  /** height in theme spacing, x4 */
  height?: ThemeSpacingAbsolute;
  color?: ThemeColors;
}
