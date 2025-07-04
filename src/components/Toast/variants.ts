import { ViewStyle } from 'react-native';

import { AppTheme } from '@/theme';

import { ToastType } from './types';

export const buildContaienrVariants = (
  theme: AppTheme,
): Record<ToastType, Pick<ViewStyle, 'backgroundColor' | 'borderColor'>> => {
  return {
    error: {
      backgroundColor: theme.colors.error['900'],
      borderColor: theme.colors.error['500'],
    },
    info: {
      backgroundColor: theme.colors.primary['900'],
      borderColor: theme.colors.primary['500'],
    },
    success: {
      backgroundColor: theme.colors.success['900'],
      borderColor: theme.colors.success['300'],
    },
  };
};
