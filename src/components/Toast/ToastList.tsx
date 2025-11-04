import * as Crypto from 'expo-crypto';
import { useEffect } from 'react';
import { View } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import useMountEffect from '@/hooks/useMountEffect';

import { ToastContext } from './context';
import { useToastStore } from './store';
import { Toast } from './Toast';
import {
  ShowToastFn,
  ToastActionType,
  ToastItem,
  ToastPosition,
  ToastType,
} from './types';

interface ToastListProps {
  setContext: (context: ToastContext) => void;
  timeout: number;
  showToastFn: ShowToastFn | undefined;
  position: ToastPosition;
}

const calculateOffset = (
  toasts: ToastItem[],
  toastId: string,
  gutter: number,
  position: ToastPosition,
) => {
  const index = toasts.findIndex((t) => t.id === toastId);

  const sliceArgs: Parameters<typeof Array.prototype.slice> =
    position === 'bottom' ? [index + 1] : [0, Math.max(0, index)];

  return toasts
    .slice(...sliceArgs)
    .reduce(
      (acc, t) => acc + (t.visible && t.height ? t.height + gutter : 0),
      0,
    );
};

export const ToastList = ({
  setContext,
  timeout,
  showToastFn,
  position,
}: ToastListProps) => {
  const { toasts, dispatch } = useToastStore();
  const { theme } = useUnistyles();

  useEffect(() => {
    const now = Date.now();

    const timeouts = toasts.map((item) => {
      const durationLeft = timeout - (now - item.createdAt);

      if (durationLeft <= 0) {
        if (item.visible) {
          dispatch({
            type: ToastActionType.Dismiss,
            id: item.id,
          });
        }

        return undefined;
      }

      const timeoutId = setTimeout(() => {
        dispatch({
          type: ToastActionType.Dismiss,
          id: item.id,
        });
      }, durationLeft);

      return timeoutId;
    });

    return () => {
      timeouts.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, [dispatch, timeout, toasts]);

  const defaultShowToast: ShowToastFn = (item) => {
    dispatch({
      type: ToastActionType.Add,
      toast: {
        ...item,
        id: Crypto.randomUUID(),
        visible: true,
        createdAt: Date.now(),
      },
    });
  };

  const showToast = showToastFn ?? defaultShowToast;

  useMountEffect(() => {
    setContext({
      showError(message, options) {
        showToast({
          message,
          type: ToastType.Error,
          ...options,
        });
      },
      showSuccess(message, options) {
        showToast({
          message,
          type: ToastType.Success,
          ...options,
        });
      },
      showInfo(message, options) {
        showToast({
          message,
          type: ToastType.Info,
          ...options,
        });
      },
    });
  });

  if (toasts.length === 0) {
    return null;
  }

  return (
    <FullWindowOverlay>
      <View style={styles.container(position)}>
        {toasts.map((item, index) => (
          <Toast
            item={item}
            index={index}
            key={item.id}
            position={position}
            offset={calculateOffset(
              toasts,
              item.id,
              theme.spacing('1'),
              position,
            )}
          />
        ))}
      </View>
    </FullWindowOverlay>
  );
};

const styles = StyleSheet.create((theme, { insets }) => ({
  container: (position: ToastPosition) => ({
    position: 'absolute',
    zIndex: theme.zIndex.highest,
    left: 0,
    right: 0,
    bottom: position === 'bottom' ? insets.bottom : undefined,
    top: position === 'top' ? insets.top : undefined,
    pointerEvents: 'box-none',
  }),
}));
