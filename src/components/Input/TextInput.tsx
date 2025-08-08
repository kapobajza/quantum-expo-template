import i18next from 'i18next';
import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { Text, TextError } from '@/components/Text';
import { useTranslation } from '@/locale';
import { createStyleSheet, useStyles, useTheme } from '@/theme';

import { buildTextInputVariants, TextInputVariants } from './variants';

export interface TextInputProps extends RNTextInputProps {
  InputLeftElement?: React.ReactNode;
  InputRightElement?: React.ReactNode;
  error?: string;
  ref?: React.Ref<RNTextInput>;
  label?: string;
  variant?: keyof TextInputVariants;
  rootStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

export const TextInput = ({
  InputLeftElement,
  InputRightElement,
  style,
  error,
  label,
  onFocus,
  onBlur,
  variant = 'primary',
  rootStyle,
  containerStyle,
  ...props
}: TextInputProps) => {
  const styles = useStyles(stylesheet);
  const { i18n } = useTranslation();
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.root, rootStyle]}>
      {label && <Text variant="small.medium">{label}</Text>}
      <View
        style={[
          styles.container({ variant, isFocused, isError: !!error }),
          containerStyle,
        ]}
      >
        {InputLeftElement}
        <RNTextInput
          style={[
            styles.input({
              dir: i18n.dir(),
              variant,
            }),
            style,
          ]}
          placeholderTextColor={theme.colors.greyscale[300]}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
        {InputRightElement}
      </View>
      <TextError error={error} />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => {
  const variants = buildTextInputVariants(theme);

  return {
    container: ({
      variant,
      isFocused,
      isError,
    }: Required<Pick<TextInputProps, 'variant'>> & {
      isFocused: boolean;
      isError: boolean | undefined;
    }) => {
      const variantStyle = variants[variant];
      const focusStyle = isFocused ? variantStyle.focus : {};
      let borderColor = variantStyle.container.borderColor;

      if (isFocused) {
        borderColor = focusStyle.borderColor;
      }

      if (isError) {
        borderColor = theme.colors.error[100];
      }

      return {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing['3'],
        borderWidth: 1,
        paddingHorizontal: theme.spacing['4'],
        borderRadius: theme.radii['4'],
        ...variantStyle.container,
        ...focusStyle,
        borderColor,
      };
    },
    input: ({
      variant,
    }: Required<Pick<TextInputProps, 'variant'>> & {
      dir: ReturnType<typeof i18next.dir>;
    }) => ({
      ...variants[variant].input,
      paddingVertical: theme.spacing['3'],
      fontSize: theme.fontSize['16'],
      flex: 1,
      fontFamily: theme.fontFamily.spaceMono,
    }),
    root: {
      gap: theme.spacing['1'],
    },
  };
});
