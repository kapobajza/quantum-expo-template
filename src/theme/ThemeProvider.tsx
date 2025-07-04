import { createContext, ReactNode, use } from 'react';

import { AppTheme } from '@/theme/default';

export const ThemeContext = createContext<AppTheme | undefined>(undefined);

export const ThemeProvider = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: AppTheme;
}) => {
  return <ThemeContext value={theme}>{children}</ThemeContext>;
};

export const useTheme = () => {
  const context = use(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
