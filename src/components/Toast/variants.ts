import { TextStyle, ViewStyle } from 'react-native';

import { AppTheme } from '@/theme/types';

import { ToastType } from './types';

type ToastMap = Record<
  ToastType,
  {
    container: Pick<ViewStyle, 'backgroundColor' | 'borderColor'>;
    text: Pick<TextStyle, 'color'>;
  }
>;

export const buildToastContainerVariants = (theme: AppTheme): ToastMap => {
  return {
    error: {
      container: {
        backgroundColor: theme.colors.error['50'],
        borderColor: theme.colors.error['300'],
      },
      text: {
        color: theme.colors.error['300'],
      },
    },
    info: {
      container: {
        backgroundColor: theme.colors.sky['25'],
        borderColor: theme.colors.sky['300'],
      },
      text: {
        color: theme.colors.sky['300'],
      },
    },
    success: {
      container: {
        backgroundColor: theme.colors.success['300'],
        borderColor: theme.colors.success['50'],
      },
      text: {
        color: theme.colors.success['50'],
      },
    },
  };
};
