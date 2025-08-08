import { ViewStyle } from 'react-native';

import { AppTheme } from '@/theme';

import { ToastType } from './types';

export const buildToastContainerVariants = (
  theme: AppTheme,
): Record<ToastType, Pick<ViewStyle, 'backgroundColor' | 'borderColor'>> => {
  return {
    error: {
      backgroundColor: theme.colors.error['50'],
      borderColor: theme.colors.error['300'],
    },
    info: {
      backgroundColor: theme.colors.sky['25'],
      borderColor: theme.colors.sky['300'],
    },
    success: {
      backgroundColor: theme.colors.success['300'],
      borderColor: theme.colors.success['50'],
    },
  };
};
