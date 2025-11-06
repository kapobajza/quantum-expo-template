import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { Icon } from '@/components/Icon';
import { Pressable } from '@/components/Pressable';
import { Text } from '@/components/Text';

import { useToastStore } from './store';
import { ToastActionType, ToastItem, ToastPosition, ToastType } from './types';
import { buildToastContainerVariants } from './variants';

export interface ToastProps {
  item: ToastItem;
  index: number;
  offset: number;
  position: ToastPosition;
}

export const Toast = ({ item, offset, position }: ToastProps) => {
  const { dispatch } = useToastStore();
  const { id, visible, message, type } = item;
  const positionY = useSharedValue(0);

  const slideOut = () => {
    const handleAnimationEnd = () => {
      dispatch({
        type: ToastActionType.Dismiss,
        id: id,
      });
    };

    positionY.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(handleAnimationEnd)();
    });
  };

  useEffect(() => {
    positionY.value = withTiming(visible ? 1 : 0, {
      duration: 500,
    });
  }, [positionY, visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            positionY.value,
            [0, 1],
            [
              50 * (position === 'top' ? -1 : 1),
              offset * (position === 'top' ? 1 : -1),
            ],
          ),
        },
      ],
      opacity: positionY.value,
    };
  });

  return (
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
        <Text style={styles.message(type)} numberOfLines={4}>
          {message}
        </Text>
        {item.RightElement ?? (
          <Pressable onPress={slideOut}>
            <Icon name="X" style={styles.icon(type)} />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create((theme) => {
  const mappedVariants = buildToastContainerVariants(theme);

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
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing('4'),
      marginHorizontal: theme.spacing('4'),
      paddingVertical: theme.spacing('2'),
      borderRadius: theme.radii[4],
      borderWidth: 1,
      marginTop: theme.spacing('2'),
      ...mappedVariants[type].container,
    }),
    icon: (type: ToastType) => ({
      color: mappedVariants[type].container.borderColor,
      width: 16,
      height: 16,
    }),
    message: (type: ToastType) => mappedVariants[type].text,
  };
});
