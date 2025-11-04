import { useEffect } from 'react';
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
import { ToastActionType, ToastItem, ToastPosition, ToastType } from './types';
import { buildToastContainerVariants } from './variants';

const MAX_Y_TRANSLATE = 30;

export interface ToastProps {
  item: ToastItem;
  index: number;
  offset: number;
  position: ToastPosition;
}

export const Toast = ({ item, offset, position }: ToastProps) => {
  const insets = useSafeAreaInsets();
  const context = useSharedValue({ y: 0 });
  const { dispatch } = useToastStore();
  const { id, visible, message, type, height } = item;
  const startY =
    (position === 'bottom' ? -offset : -(height ?? 50)) - insets[position];
  const positionY = useSharedValue(startY);

  const slideOut = () => {
    const handleAnimationEnd = () => {
      dispatch({
        type: ToastActionType.Dismiss,
        id: id,
      });
    };

    positionY.value = withTiming(startY, { duration: 500 }, () => {
      runOnJS(handleAnimationEnd)();
    });
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: positionY.value };
    })
    .onUpdate((event) => {
      const canMove =
        position === 'bottom'
          ? event.translationY > -MAX_Y_TRANSLATE
          : event.translationY < MAX_Y_TRANSLATE;

      if (canMove) {
        positionY.value = event.translationY + context.value.y;
      }
    })
    .onEnd(() => {
      runOnJS(slideOut)();
    });

  useEffect(() => {
    const endingPos = position === 'bottom' ? startY : offset;
    const startingPos = position === 'bottom' ? offset : startY;
    positionY.value = withTiming(visible ? endingPos : startingPos, {
      duration: 500,
    });
  }, [offset, position, positionY, startY, visible]);

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
              id,
              height: itemHeight,
            },
          });
        }}
      >
        <View style={styles.item(type)}>
          <Text style={styles.message} numberOfLines={4}>
            {message}
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
