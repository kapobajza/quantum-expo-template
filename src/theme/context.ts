import { createContext, use } from 'react';
import { ColorSchemeName } from 'react-native';

import { ObjectValues } from '@/types';

import { AppTheme } from './default';

export const ThemeApperance = {
  Light: 'light',
  Dark: 'dark',
  System: 'system',
} satisfies Record<string, ColorSchemeName | 'system'>;

export type ThemeApperance = ObjectValues<typeof ThemeApperance>;

export interface ThemeContext {
  theme: AppTheme;
  updateTheme: (
    themeOrCb:
      | ThemeApperance
      | ((prev: ThemeApperance | undefined) => ThemeApperance),
  ) => void;
  appearance: ThemeApperance;
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
