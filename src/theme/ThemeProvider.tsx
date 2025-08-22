import {
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from '@react-navigation/native';
import { ReactNode, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import { useThemeApperance } from './hooks/useThemeApperance';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useUnistyles();
  const { getConfiguredTheme } = useThemeApperance();
  const colorScheme = useColorScheme();

  useEffect(() => {
    void getConfiguredTheme((prev) => prev ?? colorScheme ?? 'light');
  }, [colorScheme, getConfiguredTheme]);

  const rnThemeValue = useMemo(() => {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: theme.colors.background.main,
      },
    };
  }, [theme.colors.background.main]);

  return <RNThemeProvider value={rnThemeValue}>{children}</RNThemeProvider>;
};
