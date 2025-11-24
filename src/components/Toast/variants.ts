import { AppTheme } from '@/theme/types';

import { ToastType } from './types';

type ToastMap = Record<ToastType, string>;

export const buildToastVariantColor = (theme: AppTheme): ToastMap => {
  return {
    error: theme.colors.error['100'],
    info: theme.colors.info['300'],
    success: theme.colors.success['100'],
  };
};
