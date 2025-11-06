import * as Crypto from 'expo-crypto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';

import { ToastContext } from './context';
import { useToastStore } from './store';
import { ToastList } from './ToastList';
import {
  ShowToastFn,
  ToastActionType,
  ToastPosition,
  ToastType,
} from './types';

export const ToastProvider = ({
  children,
  timeout = 5000, // 5 seconds
  showToastFn,
  position = 'top',
}: {
  children: React.ReactNode;
  timeout?: number;
  showToastFn?: ShowToastFn;
  position?: ToastPosition;
}) => {
  const { dispatch } = useToastStore();
  const defaultShowToast: ShowToastFn = (item) => {
    const toastId = Crypto.randomUUID();

    dispatch({
      type: ToastActionType.Add,
      toast: {
        ...item,
        id: toastId,
        visible: true,
        createdAt: Date.now(),
      },
    });

    return toastId;
  };

  const showToast = showToastFn ?? defaultShowToast;

  const context: ToastContext = {
    showError(message, options) {
      return showToast({
        message,
        type: ToastType.Error,
        ...options,
      });
    },
    showSuccess(message, options) {
      return showToast({
        message,
        type: ToastType.Success,
        ...options,
      });
    },
    showInfo(message, options) {
      return showToast({
        message,
        type: ToastType.Info,
        ...options,
      });
    },
    hideToast(id) {
      dispatch({
        type: ToastActionType.Dismiss,
        id,
      });
    },
    hideAllToasts() {
      dispatch({
        type: ToastActionType.DismissAll,
      });
    },
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <ToastContext value={context}>
        <ToastList timeout={timeout} position={position} />
        {children}
      </ToastContext>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
