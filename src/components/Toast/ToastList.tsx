import * as Crypto from 'expo-crypto';
import { useEffect } from 'react';
import { View } from 'react-native';

import { useMountEffect } from '@/hooks';
import { createStyleSheet, useStyles, useTheme } from '@/theme';

import { ToastContext } from './context';
import { useToastStore } from './store';
import { Toast } from './Toast';
import { ShowToastFn, ToastActionType, ToastItem, ToastType } from './types';

interface ToastListProps {
  setContext: (context: ToastContext) => void;
  timeout: number;
  showToastFn: ShowToastFn | undefined;
}

const calculateOffset = (
  toasts: ToastItem[],
  toastId: string,
  gutter: number,
) => {
  const index = toasts.findIndex((t) => t.id === toastId);

  return toasts
    .slice(0, Math.max(0, index))
    .reduce(
      (acc, t) => acc + (t.visible && t.height ? t.height + gutter : 0),
      0,
    );
};

export const ToastList = ({
  setContext,
  timeout,
  showToastFn,
}: ToastListProps) => {
  const { toasts, dispatch } = useToastStore();
  const theme = useTheme();
  const styles = useStyles(stylesheet);

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

  return (
    <View style={styles.container}>
      {toasts.map((item, index) => (
        <Toast
          item={item}
          index={index}
          key={item.id}
          offset={calculateOffset(toasts, item.id, theme.spacing['1'])}
        />
      ))}
    </View>
  );
};

const stylesheet = createStyleSheet((theme, { insets }) => ({
  container: {
    position: 'absolute',
    zIndex: theme.zIndex.highest,
    left: 0,
    right: 0,
    top: insets.top,
  },
}));
