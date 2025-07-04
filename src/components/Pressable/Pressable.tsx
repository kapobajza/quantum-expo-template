import {
  GestureResponderEvent,
  PressableProps as RNPressableProps,
  View,
  ViewStyle,
} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  ReanimatedPressable,
  ReanimatedPressableProps,
} from '@/components/Reanimated';

export interface PressableProps
  extends Omit<ReanimatedPressableProps, 'key' | 'onPress'> {
  scaleOutputRange?: [number, number];
  key?: React.Key;
  onPress: () => void | Promise<void>;
}

const DAMPING = 20;
const STIFFNESS = 320;
const defaultScaleOutputRange: [number, number] = [0.96, 1];

export const Pressable = ({
  onPressIn,
  onPressOut,
  style,
  scaleOutputRange = defaultScaleOutputRange,
  key,
  ref,
  ...props
}: PressableProps) => {
  const pressableAnimation = useSharedValue(1);

  const handlePressIn = (event: GestureResponderEvent) => {
    pressableAnimation.value = withSpring(scaleOutputRange[0], {
      damping: DAMPING,
      stiffness: STIFFNESS,
    });

    (onPressIn as RNPressableProps['onPressIn'])?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    pressableAnimation.value = withSpring(scaleOutputRange[1], {
      damping: DAMPING,
      stiffness: STIFFNESS,
    });

    (onPressOut as RNPressableProps['onPressOut'])?.(event);
  };

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      transform: [{ scale: pressableAnimation.value }],
    };
  });

  return (
    <ReanimatedPressable
      key={key}
      {...props}
      ref={ref as React.Ref<View>}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, style]}
    />
  );
};
