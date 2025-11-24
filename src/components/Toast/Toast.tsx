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

import { Box } from '@/components/Container/Box';
import { Icon, IconName } from '@/components/Icon';
import { Pressable } from '@/components/Pressable';
import { Text } from '@/components/Text';

import { useToastStore } from './store';
import { LinearProgressBar } from './ToastProgressBar';
import { ToastActionType, ToastItem, ToastPosition, ToastType } from './types';
import { buildToastVariantColor } from './variants';

export interface ToastProps {
  item: ToastItem;
  index: number;
  offset: number;
  position: ToastPosition;
  defaultDuration: number;
}

const toastIconMap: Record<ToastType, IconName> = {
  [ToastType.Success]: 'SuccessCircle',
  [ToastType.Error]: 'AlertCircle',
  [ToastType.Info]: 'InfoCircle',
};

export const Toast = ({
  item,
  offset,
  position,
  defaultDuration,
}: ToastProps) => {
  const { dispatch } = useToastStore();
  const { id, visible, message, type, duration } = item;
  const positionXAnim = useSharedValue(0);
  const positionYAnim = useSharedValue(offset);

  const slideOut = () => {
    const handleAnimationEnd = () => {
      dispatch({
        type: ToastActionType.Dismiss,
        id: id,
      });
    };

    positionXAnim.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(handleAnimationEnd)();
    });
  };

  useEffect(() => {
    positionXAnim.value = withTiming(visible ? 1 : 0, {
      duration: 500,
    });
    positionYAnim.value = withTiming(offset, { duration: 200 });
  }, [offset, positionXAnim, positionYAnim, visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            position === 'top' ? positionYAnim.value : -positionYAnim.value,
        },
        {
          translateX: interpolate(positionXAnim.value, [0, 1], [50, 0]),
        },
      ],
      opacity: positionXAnim.value,
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
      <View style={styles.item}>
        <View style={styles.content}>
          <Box flexDirection="row" alignItems="center" gap="2">
            <View style={styles.mainIconWrapper(type)}>
              <Icon
                name={toastIconMap[type]}
                style={styles.mainIcon(type) as object}
                size="5"
              />
            </View>
            <Text style={styles.message(type)} numberOfLines={4}>
              {message}
            </Text>
          </Box>
          {item.RightElement ?? (
            <Pressable onPress={slideOut}>
              <Icon name="X" style={styles.closeIcon(type)} />
            </Pressable>
          )}
        </View>
        {duration !== 'forever' && (
          <LinearProgressBar
            duration={duration ?? defaultDuration + 50}
            style={styles.progress(type)}
          />
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create((theme) => {
  const variantColorMap = buildToastVariantColor(theme);

  return {
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: theme.zIndex.highest,
    },
    item: {
      borderRadius: theme.radii[4],
      marginTop: theme.spacing('2'),
      marginHorizontal: theme.spacing('4'),
      overflow: 'hidden',
      backgroundColor: theme.colors.background.main,
      boxShadow: [
        {
          blurRadius: 10,
          color: theme.addColorTransparency(
            theme.colors.background.text.main,
            0.1,
          ),
          offsetX: 0,
          offsetY: 2,
          inset: false,
          spreadDistance: 4,
        },
      ],
    },
    closeIcon: (type: ToastType) => ({
      width: theme.spacing('5'),
      height: theme.spacing('5'),
      color: variantColorMap[type],
    }),
    mainIcon: (type: ToastType) => ({
      color: variantColorMap[type],
    }),
    mainIconWrapper: (type: ToastType) => ({
      width: theme.spacing('8'),
      height: theme.spacing('8'),
      borderRadius: 999,
      backgroundColor: theme.addColorTransparency(variantColorMap[type], 0.1),
      alignItems: 'center',
      justifyContent: 'center',
    }),
    message: (type: ToastType) => ({
      color: variantColorMap[type],
    }),
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing('4'),
      paddingVertical: theme.spacing('2'),
    },
    progress: (type: ToastType) => ({
      height: 4,
      backgroundColor: variantColorMap[type],
    }),
  };
});
