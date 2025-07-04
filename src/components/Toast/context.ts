import { createContext, use } from 'react';

export interface ToastContext {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
}

export const ToastContext = createContext<ToastContext | undefined>(undefined);

export const useToast = () => {
  const context = use(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
