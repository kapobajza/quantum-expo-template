import get from 'lodash/get';

import { createStyleSheet, useStyles, useTheme } from '@/theme';

import * as iconName from './raw';
import { IconProps } from './types';

export const Icon = (props: IconProps) => {
  const {
    name,
    width = '4',
    height = '4',
    size,
    color = 'secondary.50',
    style,
    ...rest
  } = props;
  // eslint-disable-next-line import-x/namespace
  const Component = iconName[name];
  const styles = useStyles(stylesheet);
  const theme = useTheme();
  const iconColor = get(theme.colors, color);

  return (
    <Component
      style={[styles.icon({ width, height, color, size }), style]}
      {...rest}
      color={iconColor}
    />
  );
};

const stylesheet = createStyleSheet((theme) => ({
  icon: ({
    width,
    height,
    color,
    size,
  }: Required<Pick<IconProps, 'width' | 'height' | 'color'>> &
    Pick<IconProps, 'size'>) => ({
    width: theme.spacing[size ?? width],
    height: theme.spacing[size ?? height],
    fill: get(theme.colors, color),
  }),
}));
