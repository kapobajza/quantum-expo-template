import {
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from '@react-navigation/native';
import * as SystemUI from 'expo-system-ui';
import { ReactNode, useEffect, useMemo } from 'react';

import { ThemeApperance, ThemeContext } from './context';
import { defaultTheme } from './default';
import { useThemeApperance } from './hooks/useThemeApperance';
import { darkThemeColors, lightThemeColors } from './tokens/colors';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { themeAppearance, isLoading, updateThemeAppearance } =
    useThemeApperance();

  const value = useMemo<ThemeContext>(
    () => ({
      theme: {
        ...defaultTheme,
        colors:
          themeAppearance === 'light' ? lightThemeColors : darkThemeColors,
      },
      appearance: themeAppearance as ThemeApperance,
      updateTheme: updateThemeAppearance,
      isLoading,
    }),
    [isLoading, themeAppearance, updateThemeAppearance],
  );

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

  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext value={value}>
      <RNThemeProvider value={rnThemeValue}>{children}</RNThemeProvider>
    </ThemeContext>
  );
};
