import { ReactNode, useMemo } from 'react';

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

  if (isLoading) {
    return null;
  }

  return <ThemeContext value={value}>{children}</ThemeContext>;
};
