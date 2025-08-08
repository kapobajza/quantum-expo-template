import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { Loader } from '@/components/Loader';
import { Pressable, PressableProps } from '@/components/Pressable/Pressable';
import { Text } from '@/components/Text';
import { createStyleSheet, useStyles, useTheme } from '@/theme';

import {
  buildButtonSizes,
  buildButtonVariants,
  ButtonSize,
  ButtonVariant,
  ButtonVariants,
} from './variants';

export interface ButtonProps extends PressableProps {
  title: string;
  isLoading?: boolean;
  LeftElement?: ReactNode;
  RightElement?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = ({
  title,
  style,
  isLoading,
  disabled,
  LeftElement,
  RightElement,
  variant = 'primary',
  size = 'large',
  ...props
}: ButtonProps) => {
  const pressableAnimation = useSharedValue(1);
  const styles = useStyles(stylesheet);
  const theme = useTheme();
  const buttonVariants = buildButtonVariants(theme);

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      transform: [{ scale: pressableAnimation.value }],
    };
  });

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const isDisabled = disabled || isLoading || false;

  return (
    <Pressable
      {...props}
      style={[
        animatedStyle,
        styles.container({
          disabled: isDisabled,
          variant,
          size,
          buttonVariants,
        }),
        style,
      ]}
      disabled={isDisabled}
    >
      {isLoading ? (
        <Loader
          style={styles.loader}
          color={buttonVariants[variant].text.main.color}
        />
      ) : (
        <View style={styles.contentWrapper}>
          {LeftElement}
          <Text
            style={styles.text({
              variant,
              disabled: isDisabled,
              size,
              buttonVariants,
            })}
            variant="body.medium"
            numberOfLines={1}
            center
          >
            {title}
          </Text>
          {RightElement}
        </View>
      )}
    </Pressable>
  );
};

const stylesheet = createStyleSheet((theme) => {
  const buttonSizes = buildButtonSizes(theme);

  return {
    container: ({
      disabled,
      variant,
      size,
      buttonVariants,
    }: Required<Pick<ButtonProps, 'disabled' | 'variant' | 'size'>> & {
      buttonVariants: ButtonVariants;
    }) => {
      return {
        ...buttonVariants[variant].button.main,
        ...(disabled ? buttonVariants[variant].button.disabled : {}),
        ...buttonSizes[size].button,
        paddingHorizontal: theme.spacing['4'],
        borderRadius: theme.radii['4'],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing['2'],
      };
    },
    text: ({
      variant = 'primary',
      disabled,
      size,
      buttonVariants,
    }: Required<Pick<ButtonProps, 'variant' | 'disabled' | 'size'>> & {
      buttonVariants: ButtonVariants;
    }) => {
      return {
        ...buttonVariants[variant].text.main,
        ...(disabled ? buttonVariants[variant].text.disabled : {}),
        ...buttonSizes[size].text,
        fontWeight: theme.fontWeight[600],
      };
    },
    loader: {
      margin: 0,
    },
    contentWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[3],
    },
  };
});
