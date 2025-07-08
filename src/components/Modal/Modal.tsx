import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useMountEffect } from '@/hooks';
import { createStyleSheet, useStyles, useTheme } from '@/theme';

import { useModal } from './context';
import { ModalItem } from './types';

interface ModalProps {
  item: ModalItem;
}

export const Modal = ({ item }: ModalProps) => {
  const scaleAnimation = useSharedValue(0);
  const styles = useStyles(stylesheet);
  const theme = useTheme();
  const { hideModal } = useModal();

  useMountEffect(() => {
    scaleAnimation.value = withTiming(1, {
      duration: 300,
    });
  });

  const interpolatedColors = [
    theme.addColorTransparency(theme.colors.secondary[100], 0),
    theme.addColorTransparency(theme.colors.secondary[100], 0.5),
  ];

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scaleAnimation.value,
      [0, 1],
      interpolatedColors,
    ),
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnimation.value }],
    opacity: scaleAnimation.value,
  }));

  const handleHideModal = () => {
    const handleAnimationEnd = () => {
      hideModal(item.name);
    };

    scaleAnimation.value = withTiming(
      0,
      {
        duration: 300,
      },
      () => {
        runOnJS(handleAnimationEnd)();
      },
    );
  };

  return (
    <Animated.View
      style={[styles.overlay, animatedOverlayStyle]}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={handleHideModal}
        pointerEvents={'auto'}
        style={StyleSheet.absoluteFillObject}
        {...item.options?.backdropProps}
      />
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <item.Component
          // @ts-expect-error - it's hard to infer the type of params here
          params={item.params}
          closeModal={handleHideModal}
        />
      </Animated.View>
    </Animated.View>
  );
};

const stylesheet = createStyleSheet((theme, { dimensions }) => ({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.highest,
  },
  container: {
    padding: theme.spacing['4'],
    backgroundColor: theme.colors.secondary[900],
    borderRadius: theme.radii['4'],
    justifyContent: 'center',
    width: dimensions.width - theme.spacing['8'],
  },
  button: {
    padding: theme.spacing['2'],
  },
  message: {
    marginBottom: theme.spacing['4'],
  },
}));
