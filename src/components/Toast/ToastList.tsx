import { Fragment, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useToastStore } from './store';
import { Toast } from './Toast';
import { ToastActionType, ToastItem, ToastPosition } from './types';

const RNScreensFullWindowOverlay =
  Platform.OS === 'ios' ? FullWindowOverlay : Fragment;

interface ToastListProps {
  timeout: number;
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

export const ToastList = ({ timeout, position }: ToastListProps) => {
  const { toasts, dispatch } = useToastStore();
  const { theme } = useUnistyles();

  useEffect(() => {
    const now = Date.now();

    const timeouts = toasts.map((item) => {
      if (typeof item.duration === 'string') {
        return undefined;
      }

      const durationLeft = (item.duration ?? timeout) - (now - item.createdAt);

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
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      });
    };
  }, [dispatch, timeout, toasts]);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <RNScreensFullWindowOverlay>
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
            defaultDuration={timeout}
          />
        ))}
      </View>
    </RNScreensFullWindowOverlay>
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
