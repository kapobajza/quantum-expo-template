import { createContext, use } from 'react';

import { ModalName, ShowModalFn } from './types';

export interface ModalContext {
  showModal: ShowModalFn;
  hideModal: (name?: ModalName) => void;
  closeAllModals: () => void;
}

export const ModalContext = createContext<ModalContext | undefined>(undefined);

export const useModal = () => {
  const context = use(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};
