import { useCallback, useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMountEffect } from '@/hooks';
import { createStyleSheet, useStyles, useTheme } from '@/theme';

import { useActionSheetStore } from './store';
import { ActionSheetItem, SheetActionType } from './types';

export interface ActionSheetProps {
  item: ActionSheetItem;
  isPendingClose: boolean;
  removeActionSheet: (id: string) => void;
}

const SPRING_CONFIG: WithSpringConfig = {
  damping: 25,
  stiffness: 250,
  mass: 1.1,
  overshootClamping: false,
};

export const ActionSheet = ({
  item,
  isPendingClose,
  removeActionSheet,
}: ActionSheetProps) => {
  const styles = useStyles(stylesheet);
  const { dispatch } = useActionSheetStore();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const positionY = useSharedValue(0);
  const context = useSharedValue({
    y: 0,
    translateY: 0,
  });
  const { height: screenHeight } = useWindowDimensions();
  const { closeOnOverlayPress = true, snapPoints = ['auto'] } =
    item.options ?? {};
  const parsedSnapPoints = useMemo(() => {
    return snapPoints.map((p) => {
      if (!p) {
        return 0;
      }

      if (p === 'auto') {
        return (item.height as number) + insets.bottom;
      }

      if (typeof p === 'number') {
        return p;
      }

      const percentage = parseFloat(p);
      return (percentage / 100) * screenHeight;
    });
  }, [insets.bottom, item.height, screenHeight, snapPoints]);
  const firstSnapPoint = parsedSnapPoints[0];

  const maxSnapPoint = useMemo(
    () => Math.max(...parsedSnapPoints),
    [parsedSnapPoints],
  );

  const slideIn = () => {
    positionY.value = withSpring(1, SPRING_CONFIG);
  };

  useMountEffect(() => {
    slideIn();
  });

  const translateY = useDerivedValue(() => {
    return interpolate(positionY.value, [0, 1], [firstSnapPoint, 0]);
  });

  const handleHideActionSheet = useCallback(() => {
    const handleAnimationEnd = () => {
      removeActionSheet(item.id);
    };

    positionY.value = withSpring(0, SPRING_CONFIG, () => {
      runOnJS(handleAnimationEnd)();
    });
  }, [item.id, positionY, removeActionSheet]);

  useEffect(() => {
    if (isPendingClose) {
      handleHideActionSheet();
    }
  }, [handleHideActionSheet, isPendingClose]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const interpolatedColors = [
    theme.addColorTransparency(theme.colors.secondary[100], 0),
    theme.addColorTransparency(theme.colors.secondary[100], 0.5),
  ];

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      positionY.value,
      [0, 1],
      interpolatedColors,
    ),
  }));

  const gesture = useMemo(() => {
    const pan = Gesture.Pan()
      .onStart(() => {
        context.value = {
          y: positionY.value,
          translateY: translateY.value,
        };
      })
      .activeOffsetY([-10, 10])
      .minDistance(0)
      .shouldCancelWhenOutside(false)
      .onUpdate((event) => {
        const max = maxSnapPoint / firstSnapPoint;

        const interpolated = interpolate(
          context.value.translateY + event.translationY,
          [firstSnapPoint, 0],
          [0, 1],
        );

        positionY.value = Math.min(max, interpolated);
      })
      .onEnd((event) => {
        if (event.velocityY > 500) {
          runOnJS(handleHideActionSheet)();
          return;
        }

        const snapPositions = parsedSnapPoints.map((point) => {
          return point / firstSnapPoint;
        });

        const currentPos = positionY.value;
        const closest = snapPositions.reduce((prev, curr) =>
          Math.abs(curr - currentPos) < Math.abs(prev - currentPos)
            ? curr
            : prev,
        );

        positionY.value = withSpring(closest, SPRING_CONFIG);
      });

    return pan;
  }, [
    context,
    firstSnapPoint,
    handleHideActionSheet,
    maxSnapPoint,
    parsedSnapPoints,
    positionY,
    translateY,
  ]);

  if (typeof item.height === 'undefined') {
    return (
      <View
        onLayout={(e) => {
          const { height: itemHeight } = e.nativeEvent.layout;

          dispatch({
            type: SheetActionType.Update,
            sheet: {
              id: item.id,
              height: itemHeight,
            },
          });
        }}
        style={styles.hidden}
      >
        <View style={styles.handle} />
        <item.Component />
      </View>
    );
  }

  return (
    <Animated.View
      style={[styles.overlay, animatedOverlayStyle]}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={handleHideActionSheet}
        disabled={!closeOnOverlayPress}
        pointerEvents={closeOnOverlayPress ? 'auto' : 'none'}
        style={StyleSheet.absoluteFillObject}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.container(maxSnapPoint, firstSnapPoint),
            animatedStyle,
          ]}
        >
          <View style={styles.handle} />
          <item.Component />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const stylesheet = createStyleSheet((theme, { insets, dimensions }) => {
  return {
    container: (maxSnapPoint: number, firstSnapPoint: number) => ({
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: theme.zIndex.highest,
      backgroundColor: theme.colors.background.main,
      top: dimensions.height - firstSnapPoint,
      height: maxSnapPoint,
      paddingBottom: insets.bottom,
      borderTopLeftRadius: theme.radii['8'],
      borderTopRightRadius: theme.radii['8'],
    }),
    overlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: theme.zIndex.highest,
    },
    handle: {
      width: 50,
      height: 6,
      borderRadius: theme.radii.full,
      backgroundColor: theme.colors.secondary[600],
      alignSelf: 'center',
      marginBottom: theme.spacing['2'],
      marginTop: theme.spacing['4'],
    },
    hidden: {
      opacity: 0,
      position: 'absolute',
      top: -9999,
    },
  };
});
