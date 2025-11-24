import { useEffect, useState } from 'react';
import { ViewProps } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Rect, SvgProps } from 'react-native-svg';
import { StyleSheet } from 'react-native-unistyles';

interface Props extends ViewProps {
  duration: number;
}

export const LinearProgressBar = ({ duration, style, ...props }: Props) => {
  const progressAnim = useSharedValue(1);

  useEffect(() => {
    progressAnim.value = withTiming(0, { duration });
  }, [duration, progressAnim]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleX: progressAnim.value,
        },
      ],
      transformOrigin: 'left',
    };
  });

  return (
    <Animated.View
      {...props}
      style={[styles.progressBar, animatedStyle, style]}
    />
  );
};

interface RectProps extends SvgProps {
  duration: number;
  color: string;
}

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export const RectProgressBar = ({
  duration,
  color,
  style,
  ...props
}: RectProps) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const offset = useSharedValue(0);
  const perimeter = 2 * (width + height);

  useEffect(() => {
    offset.value = withTiming(perimeter, { duration });
  }, [duration, offset, perimeter]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: offset.value,
    } satisfies React.ComponentProps<typeof Rect>;
  });

  return (
    <Svg
      height="100%"
      width="100%"
      style={[styles.rectContainer, style]}
      fill="transparent"
      onLayout={(e) => {
        const { width: w, height: h } = e.nativeEvent.layout;
        setWidth(w);
        setHeight(h);
      }}
      {...props}
      pointerEvents="none"
    >
      <AnimatedRect
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        x={0}
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        y={0}
        height="100%"
        width="100%"
        stroke={color}
        strokeWidth={2}
        rx={6}
        ry={6}
        fill="transparent"
        strokeDasharray={[perimeter, perimeter]}
        animatedProps={animatedProps}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 4,
    backgroundColor: 'white',
    overflow: 'hidden',
    width: '100%',
  },
  rectContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
