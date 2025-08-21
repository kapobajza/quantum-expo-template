import { useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '@/components/Text';

import { useToastStore } from './store';
import { ToastActionType, ToastItem, ToastType } from './types';
import { buildToastContainerVariants } from './variants';

const MAX_Y_TRANSLATE = 30;

export interface ToastProps {
  item: ToastItem;
  index: number;
  offset: number;
}

export const Toast = ({ item, offset }: ToastProps) => {
  const insets = useSafeAreaInsets();
  const context = useSharedValue({ y: 0 });
  const { dispatch } = useToastStore();
  const startY = useMemo(
    () => -(item.height ?? 50) - insets.top,
    [item.height, insets.top],
  );
  const positionY = useSharedValue(startY);

  const slideOut = useCallback(() => {
    const handleAnimationEnd = () => {
      dispatch({
        type: ToastActionType.Dismiss,
        id: item.id,
      });
    };

    positionY.value = withTiming(startY, { duration: 500 }, () => {
      runOnJS(handleAnimationEnd)();
    });
  }, [dispatch, item.id, positionY, startY]);

  const updatePosition = useCallback(() => {
    positionY.value = withTiming(item.visible ? offset : startY, {
      duration: 500,
    });
  }, [item.visible, offset, positionY, startY]);

  const gesture = Gesture.Pan()
    .onStart(() => {
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

  useEffect(() => {
    updatePosition();
  }, [updatePosition, offset, item.visible]);

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

          dispatch({
            type: ToastActionType.Update,
            toast: {
              id: item.id,
              height: itemHeight,
            },
          });
        }}
      >
        <View style={styles.item(item.type)}>
          <Text style={styles.message} numberOfLines={4}>
            {item.message}
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create((theme) => {
  const containerVariants = buildToastContainerVariants(theme);

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
      paddingHorizontal: theme.spacing('4'),
      marginHorizontal: theme.spacing('4'),
      paddingVertical: theme.spacing('2'),
      borderRadius: theme.radii[4],
      borderWidth: 1,
      marginTop: theme.spacing('2'),
      ...containerVariants[type],
    }),
    message: {
      color: theme.colors.greyscale['50'],
      fontWeight: theme.fontWeight.bold,
    },
  };
});
