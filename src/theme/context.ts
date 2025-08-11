import { createContext, use } from 'react';

import { AppTheme } from './default';

export type ThemeApperance = 'light' | 'dark';

export interface ThemeContext {
  theme: AppTheme;
  updateTheme: (
    themeOrCb:
      | ThemeApperance
      | ((prev: ThemeApperance | undefined) => ThemeApperance),
  ) => void;
  appearance: ThemeApperance | undefined;
  isLoading: boolean;
}

export const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export const useTheme = () => {
  const context = use(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context.theme;
};

export const useThemeOptions = () => {
  const context = use(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemeUpdate must be used within a ThemeProvider');
  }

  const { theme, ...options } = context;

  return options;
};
