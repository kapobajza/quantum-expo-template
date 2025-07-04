import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { Loader } from '@/components/Loader';
import { Pressable, PressableProps } from '@/components/Pressable/Pressable';
import { Text } from '@/components/Text';
import { createStyleSheet, useStyles, useTheme } from '@/theme';

import { buildButtonVariants, ButtonVariant } from './variants';

export interface ButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  RightElement?: ReactNode;
  variant?: ButtonVariant;
}

export const Button = ({
  title,
  style,
  isLoading,
  disabled,
  RightElement,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const pressableAnimation = useSharedValue(1);
  const styles = useStyles(stylesheet);
  const theme = useTheme();

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      transform: [{ scale: pressableAnimation.value }],
    };
  });

  return (
    <Pressable
      {...props}
      style={[
        animatedStyle,
        styles.container({ isLoading, disabled, variant }),
        style,
      ]}
      disabled={isLoading ?? disabled}
    >
      {isLoading ? (
        <Loader style={styles.loader} color={theme.colors.secondary[900]} />
      ) : (
        <Text
          style={styles.text({ variant })}
          variant="h6"
          numberOfLines={1}
          center
        >
          {title}
        </Text>
      )}
      {!isLoading && RightElement}
    </Pressable>
  );
};

const stylesheet = createStyleSheet((theme) => {
  const buttonVariants = buildButtonVariants(theme);

  return {
    container: ({
      isLoading,
      disabled,
      variant = 'primary',
    }: Pick<ButtonProps, 'isLoading' | 'disabled' | 'variant'>) => ({
      ...buttonVariants[variant].button,
      padding: theme.spacing['4'],
      borderRadius: theme.radii['4'],
      opacity: isLoading || disabled ? 0.5 : undefined,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing['2'],
    }),
    text: ({ variant = 'primary' }: Pick<ButtonProps, 'variant'>) => {
      return buttonVariants[variant].text;
    },
    loader: {
      margin: 0,
    },
  };
});
