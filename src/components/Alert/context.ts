import { createContext, use } from 'react';

import { AlertItem, HideAlertFn } from './types';

export interface AlertContext {
  showAlert: (item: AlertItem) => void;
  hideAlert: HideAlertFn;
}

export const AlertContext = createContext<AlertContext | undefined>(undefined);

export const useAlert = () => {
  const context = use(AlertContext);

  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }

  return context;
};
