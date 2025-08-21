import React, { useCallback, useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { ModalItem } from './types';

interface ModalProps {
  item: ModalItem;
  isPendingClose: boolean;
  removeModal: (id: string) => void;
}

export const Modal = ({ item, isPendingClose, removeModal }: ModalProps) => {
  const scaleAnimation = useSharedValue(0);

  useEffect(() => {
    scaleAnimation.value = withTiming(1, {
      duration: 300,
    });
  }, [scaleAnimation]);

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: scaleAnimation.value,
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnimation.value }],
    opacity: scaleAnimation.value,
  }));

  const handleHideModal = useCallback(() => {
    const handleAnimationEnd = () => {
      removeModal(item.id);
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
  }, [item.id, removeModal, scaleAnimation]);

  useEffect(() => {
    if (isPendingClose) {
      handleHideModal();
    }
  }, [handleHideModal, isPendingClose]);

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

const styles = StyleSheet.create((theme, { screen }) => ({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.highest,
    backgroundColor: theme.addColorTransparency(
      theme.colors.background.main,
      0.4,
    ),
  },
  container: {
    padding: theme.spacing('md'),
    marginHorizontal: theme.spacing('md'),
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.radii['8'],
    justifyContent: 'center',
    width: screen.width - theme.spacing('md') * 2,
    ...theme.shadows.large,
  },
  button: {
    padding: theme.spacing(2),
  },
  message: {
    marginBottom: theme.spacing(4),
  },
}));
