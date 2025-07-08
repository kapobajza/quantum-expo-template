import { useState } from 'react';

import { ModalContext } from './context';
import { ModalList } from './ModalList';
import { ModalStack } from './types';

export const ModalProvider = ({
  children,
  stack,
}: {
  children: React.ReactNode;
  stack: ModalStack;
}) => {
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
