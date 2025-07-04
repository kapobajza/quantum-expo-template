import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { createStyleSheet, useStyles } from '@/theme';

import { ToastContext } from './context';
import { ToastList } from './ToastList';
import { ShowToastFn } from './types';

export const ToastProvider = ({
  children,
  timeout = 5000, // 5 seconds
  showToastFn,
}: {
  children: React.ReactNode;
  timeout?: number;
  showToastFn?: ShowToastFn;
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
  const styles = useStyles(stylesheet);

  return (
    <GestureHandlerRootView style={styles.root}>
      <ToastContext value={context}>
        {children}
        <ToastList
          timeout={timeout}
          setContext={setContext}
          showToastFn={showToastFn}
        />
      </ToastContext>
    </GestureHandlerRootView>
  );
};

const stylesheet = createStyleSheet({
  root: {
    flex: 1,
  },
});
