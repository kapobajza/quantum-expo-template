import { createContext, use } from 'react';

import { ToastItemMinimal } from './types';

type ShowToastContextFn = (
  message: string,
  options?: Partial<Omit<ToastItemMinimal, 'message' | 'type'>>,
) => string;

export interface ToastContext {
  showError: ShowToastContextFn;
  showSuccess: ShowToastContextFn;
  showInfo: ShowToastContextFn;
  hideToast: (id?: string) => void;
  hideAllToasts: () => void;
}

export const ToastContext = createContext<ToastContext | undefined>(undefined);

export const useToast = () => {
  const context = use(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
