import { ReactNode, useMemo, useState } from 'react';

import { ThemeApperance, ThemeContext } from './context';
import { defaultTheme } from './default';
import { darkThemeColors, lightThemeColors } from './tokens/colors';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeAppearance, setThemeAppearance] =
    useState<ThemeApperance>('light');

  const value = useMemo<ThemeContext>(
    () => ({
      theme: {
        ...defaultTheme,
        colors:
          themeAppearance === 'light' ? lightThemeColors : darkThemeColors,
      },
      appearance: themeAppearance,
      updateTheme: setThemeAppearance,
    }),
    [themeAppearance],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
};
