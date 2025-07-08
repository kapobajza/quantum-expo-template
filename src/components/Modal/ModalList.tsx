import { useEffect, useState } from 'react';

import { ModalContext } from './context';
import { Modal } from './Modal';
import { ModalItem, ModalStack } from './types';

interface ModalListProps {
  setContext: (context: ModalContext) => void;
  stack: ModalStack;
}

const timeoutsMap = new Map<string, ReturnType<typeof setTimeout>>();

export const ModalList = ({ setContext, stack }: ModalListProps) => {
  const [items, setItems] = useState<ModalItem[]>([]);

  useEffect(() => {
    setContext({
      hideModal: (name) => {
        timeoutsMap.set(
          name,
          // eslint-disable-next-line @eslint-react/web-api/no-leaked-timeout
          setTimeout(() => {
            setItems((prevItems) =>
              prevItems.filter((item) => item.name !== name),
            );
          }, 300),
        );
      },
      showModal: (...args) => {
        const [name, opts] = args;
        const {
          // @ts-expect-error - args do exist
          args: params,
          options,
        } = opts ?? {};

        setItems((prevItems) => [
          ...prevItems,
          {
            name,
            Component: stack[name],
            params: params as never,
            options,
          },
        ]);
      },
      closeAllModals() {
        timeoutsMap.forEach((timeout) => {
          clearTimeout(timeout);
        });
        timeoutsMap.clear();
        setItems([]);
      },
    });

    return () => {
      timeoutsMap.forEach((timeout) => {
        clearTimeout(timeout);
      });
      timeoutsMap.clear();
    };
  }, [items, setContext, stack]);

  return items.map((item) => <Modal item={item} key={item.name} />);
};
