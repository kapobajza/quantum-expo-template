import i18next from 'i18next';
import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import { Text } from '@/components/Text';
import { useTranslation } from '@/locale';
import { createStyleSheet, useStyles } from '@/theme';

export interface TextInputProps extends RNTextInputProps {
  InputLeftElement?: React.ReactNode;
  InputRightElement?: React.ReactNode;
  error?: string;
  ref?: React.Ref<RNTextInput>;
  label?: string;
}

export const TextInput = ({
  InputLeftElement,
  InputRightElement,
  style,
  error,
  label,
  ...props
}: TextInputProps) => {
  const styles = useStyles(stylesheet);
  const { i18n } = useTranslation();

  return (
    <View style={styles.root}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.container}>
        {InputLeftElement}
        <RNTextInput style={[styles.input(i18n.dir()), style]} {...props} />
        {InputRightElement}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing['4'],
    borderWidth: 1,
    borderRadius: theme.radii['4'],
    borderColor: theme.colors.primary[800],
  },
  input: (dir: ReturnType<(typeof i18next)['dir']>) => ({
    paddingVertical: theme.spacing['3'],
    paddingHorizontal: theme.spacing['4'],
    fontSize: theme.fontSize['16'],
    flex: 1,
    textAlign: dir === 'rtl' ? 'right' : 'left',
    fontFamily: theme.fontFamily.spaceMono,
  }),
  errorText: {
    color: theme.colors.error[500],
    fontWeight: theme.fontWeight.bold,
  },
  root: {
    gap: theme.spacing['1'],
  },
  label: {
    fontWeight: theme.fontWeight.bold,
  },
}));
