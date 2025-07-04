import * as Crypto from 'expo-crypto';
import { useState } from 'react';

import { useMountEffect } from '@/hooks';

import { ToastContext } from './context';
import { ToastItem } from './ToastItem';
import { ShowToastFn, ToastOptions, ToastType } from './types';

interface ToastListProps {
  setContext: (context: ToastContext) => void;
  timeout: number;
  showToastFn: ShowToastFn | undefined;
}

export const ToastList = ({
  setContext,
  timeout,
  showToastFn,
}: ToastListProps) => {
  const [items, setItems] = useState<ToastOptions[]>([]);

  const defaultShowToast: ShowToastFn = (item) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        ...item,
        id: Crypto.randomUUID(),
      },
    ]);
  };

  const showToast = showToastFn ?? defaultShowToast;

  useMountEffect(() => {
    setContext({
      showError(message) {
        showToast({
          message,
          type: ToastType.Error,
        });
      },
      showSuccess(message) {
        showToast({
          message,
          type: ToastType.Success,
        });
      },
      showInfo(message) {
        showToast({
          message,
          type: ToastType.Info,
        });
      },
    });
  });

  return items.map((item, index) => (
    <ToastItem
      item={item}
      timeout={timeout}
      index={index}
      onAnimateEnd={() => {
        setItems((prevItems) =>
          prevItems.filter((prevItem) => prevItem.id !== item.id),
        );
      }}
      key={item.id}
    />
  ));
};
