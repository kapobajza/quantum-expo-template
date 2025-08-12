import { useEffect } from 'react';

import { ModalContext } from './context';
import { Modal } from './Modal';
import { useModalStore } from './store';
import { ModalActionType, ModalStack } from './types';

interface ModalListProps {
  setContext: (context: ModalContext) => void;
  stack: ModalStack;
}

export const ModalList = ({ setContext, stack }: ModalListProps) => {
  const { modals, dispatch, pendingCloseQueue } = useModalStore();

  useEffect(() => {
    setContext({
      hideModal: (name) => {
        dispatch({
          type: ModalActionType.Dismiss,
          name,
        });
      },
      showModal: (...args) => {
        const [name, opts] = args;
        const {
          // @ts-expect-error - args do exist
          args: params,
          options,
        } = opts ?? {};

        dispatch({
          type: ModalActionType.Show,
          modal: {
            name,
            Component: stack[name],

            params,
            options,
          },
        });
      },
      closeAllModals() {
        dispatch({
          type: ModalActionType.DismisAll,
        });
      },
    });
  }, [dispatch, modals, setContext, stack]);

  return modals.map((item) => {
    return (
      <Modal
        item={item}
        key={item.name}
        isPendingClose={pendingCloseQueue.has(item.id)}
        removeModal={(modalId) => {
          dispatch({
            type: ModalActionType.Remove,
            id: modalId,
          });
        }}
      />
    );
  });
};
