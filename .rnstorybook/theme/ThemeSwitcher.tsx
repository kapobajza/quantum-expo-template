import { useEffect } from 'react';

import { ThemeApperance, useThemeOptions } from '@/theme';

export const ThemeSwitcher = ({
  theme,
}: {
  theme: ThemeApperance | undefined;
}) => {
  const { updateTheme } = useThemeOptions();

  useEffect(() => {
    if (!theme) return;
    updateTheme(theme);
  }, [theme, updateTheme]);

  return null;
};
