import React from 'react';
import { View } from 'react-native';

import { Pressable } from '@/components/Pressable';
import { Text } from '@/components/Text';
import { createStyleSheet, useStyles, useThemeOptions } from '@/theme';

export const ThemeSwitcher = () => {
  const styles = useStyles(stylesheet);
  const { updateTheme } = useThemeOptions();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          updateTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        }}
        style={{ alignSelf: 'flex-start' }}
      >
        <Text>Switch Theme</Text>
      </Pressable>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.md,
    marginVertical: theme.spacing[4],
  },
}));
