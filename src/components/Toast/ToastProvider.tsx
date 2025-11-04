import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';

import { ToastContext } from './context';
import { ToastList } from './ToastList';
import { ShowToastFn, ToastPosition } from './types';

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
  const [context, setContext] = useState<ToastContext>({
    showError() {
      // no-op, will be overridden by Toast
    },
    showInfo() {
      // no-op, will be overridden by Toast
    },
    showSuccess() {
      // no-op, will be overridden by Toast
    },
  });

  return (
    <GestureHandlerRootView style={styles.root}>
      <ToastContext value={context}>
        <ToastList
          timeout={timeout}
          setContext={setContext}
          showToastFn={showToastFn}
          position={position}
        />
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
