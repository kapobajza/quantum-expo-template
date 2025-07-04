import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/Text';
import { createStyleSheet, useStyles } from '@/theme';

import { ToastOptions, ToastType } from './types';
import { buildContaienrVariants } from './variants';

const INITIAL_Y_POSITION = -300;
const MAX_Y_TRANSLATE = 30;

export interface ToastProps {
  timeout: number;
  onAnimateEnd: () => void;
  item: ToastOptions;
  index: number;
}

export const ToastItem = ({
  timeout,
  onAnimateEnd,
  item,
  index,
}: ToastProps) => {
  const styles = useStyles(stylesheet);
  const positionY = useSharedValue(INITIAL_Y_POSITION);
  const context = useSharedValue({ y: 0 });
  const { top } = useSafeAreaInsets();
  const [height, setHeight] = useState(0);
  const toastTimeoutId = useRef<number | undefined>(undefined);
  const hasAnimatedRef = useRef(false);
  const isInitialMount = useRef(true);

  const getTargetY = useCallback(
    (position: number, height: number) => {
      return top + height * position;
    },
    [top],
  );

  const clearToastTimeout = () => {
    clearTimeout(toastTimeoutId.current);
  };

  const slideOut = useCallback(() => {
    const handleAnimationEnd = () => {
      onAnimateEnd();
    };

    positionY.value = withTiming(INITIAL_Y_POSITION, { duration: 500 }, () => {
      runOnJS(handleAnimationEnd)();
    });
  }, [onAnimateEnd, positionY]);

  const slideIn = useCallback(
    (height: number) => {
      clearToastTimeout();

      const handleAnimationEnd = () => {
        isInitialMount.current = false;

        toastTimeoutId.current = setTimeout(() => {
          slideOut();
        }, timeout);
      };

      positionY.value = withTiming(
        getTargetY(index, height),
        {
          duration: 500,
        },
        () => {
          runOnJS(handleAnimationEnd)();
        },
      );
    },
    [getTargetY, index, positionY, slideOut, timeout],
  );

  useEffect(() => {
    return () => {
      clearToastTimeout();
    };
  }, []);

  useEffect(() => {
    if (!isInitialMount.current && height > 0) {
      positionY.value = withTiming(getTargetY(index, height), {
        duration: 50,
      });
    }
  }, [getTargetY, positionY, height, index]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(clearToastTimeout)();
      context.value = { y: positionY.value };
    })
    .onUpdate((event) => {
      if (event.translationY < MAX_Y_TRANSLATE) {
        positionY.value = event.translationY + context.value.y;
      }
    })
    .onEnd(() => {
      runOnJS(slideOut)();
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: positionY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.container, animatedStyle]}
        onLayout={(e) => {
          const { height: itemHeight } = e.nativeEvent.layout;

          if (height === itemHeight || hasAnimatedRef.current) {
            return;
          }

          hasAnimatedRef.current = true;

          if (isInitialMount.current) {
            slideIn(itemHeight);
            setHeight(itemHeight);
          }
        }}
      >
        <View style={styles.item(item.type)}>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const stylesheet = createStyleSheet((theme) => {
  const containerVariants = buildContaienrVariants(theme);

  return {
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: theme.zIndex.highest,
    },
    item: (type: ToastType) => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing['4'],
      marginHorizontal: theme.spacing['4'],
      paddingVertical: theme.spacing['2'],
      borderRadius: theme.radii[4],
      borderWidth: 1,
      marginTop: theme.spacing['2'],
      ...containerVariants[type],
    }),
    message: {
      color: theme.colors.secondary['50'],
      fontWeight: theme.fontWeight.bold,
    },
  };
});
