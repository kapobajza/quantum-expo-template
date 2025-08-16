import {
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from '@react-navigation/native';
import * as SystemUI from 'expo-system-ui';
import { ReactNode, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { ThemeApperance, ThemeContext } from './context';
import { defaultTheme } from './default';
import { useThemeApperance } from './hooks/useThemeApperance';
import { darkThemeColors, lightThemeColors } from './tokens/colors';

export const ThemeProvider = ({
  children,
  shouldLoadInitially = true,
}: {
  children: ReactNode;
  shouldLoadInitially?: boolean;
}) => {
  const {
    // Appearance
    themeAppearance,
    isLoading,
    isInitialLoading,
    updateThemeAppearance,
  } = useThemeApperance();
  const colorScheme = useColorScheme();

  const value = useMemo<ThemeContext>(() => {
    let colors: typeof lightThemeColors = lightThemeColors;

    if (themeAppearance === ThemeApperance.System) {
      colors = colorScheme === 'dark' ? darkThemeColors : lightThemeColors;
    } else {
      colors =
        themeAppearance === ThemeApperance.Dark
          ? darkThemeColors
          : lightThemeColors;
    }

    return {
      theme: {
        ...defaultTheme,
        colors,
      },
      appearance: themeAppearance,
      updateTheme: updateThemeAppearance,
      isLoading,
    };
  }, [colorScheme, isLoading, themeAppearance, updateThemeAppearance]);

  useEffect(() => {
    void (async () => {
      await SystemUI.setBackgroundColorAsync(
        value.theme.colors.background.main,
      );
    })();
  }, [value.theme.colors.background.main]);

  const rnThemeValue = useMemo(() => {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: value.theme.colors.background.main,
      },
    };
  }, [value.theme.colors.background.main]);

  if (isInitialLoading && shouldLoadInitially) {
    return null;
  }

  return (
    <ThemeContext value={value}>
      <RNThemeProvider value={rnThemeValue}>{children}</RNThemeProvider>
    </ThemeContext>
  );
};
