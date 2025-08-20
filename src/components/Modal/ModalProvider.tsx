import { useState } from 'react';

import { AlertModal } from '@/components/Alert/AlertModal';

import { ModalContext } from './context';
import { ModalList } from './ModalList';
import { ModalStack } from './types';

const stack: ModalStack = {
  Alert: AlertModal,
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [context, setContext] = useState<ModalContext>({
    hideModal() {
      // no-op, will be overridden
    },
    showModal() {
      // no-op, will be overridden
    },
    closeAllModals() {
      // no-op, will be overridden
    },
  });

  return (
    <ModalContext value={context}>
      {children}
      <ModalList setContext={setContext} stack={stack} />
    </ModalContext>
  );
};
