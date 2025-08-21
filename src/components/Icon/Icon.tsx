import get from 'lodash/get';
import { StyleSheet } from 'react-native-unistyles';

import { useTheme } from '@/theme';

import * as iconName from './raw';
import { IconProps } from './types';

export const Icon = (props: IconProps) => {
  const {
    name,
    width = '4',
    height = '4',
    size,
    color = 'background.text.main',
    style,
    ...rest
  } = props;
  // eslint-disable-next-line import-x/namespace
  const Component = iconName[name];
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

const styles = StyleSheet.create((theme) => ({
  icon: ({
    width,
    height,
    color,
    size,
  }: Required<Pick<IconProps, 'width' | 'height' | 'color'>> &
    Pick<IconProps, 'size'>) => ({
    width: theme.spacing(size ?? width),
    height: theme.spacing(size ?? height),
    fill: get(theme.colors, color),
  }),
}));
