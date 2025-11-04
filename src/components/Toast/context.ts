import { createContext, use } from 'react';

import { ToastItem } from './types';

type ShowToastFn = (
  message: string,
  options?: Partial<Pick<ToastItem, 'position'>>,
) => void;

export interface ToastContext {
  showError: ShowToastFn;
  showSuccess: ShowToastFn;
  showInfo: ShowToastFn;
}

export const ToastContext = createContext<ToastContext | undefined>(undefined);

export const useToast = () => {
  const context = use(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
