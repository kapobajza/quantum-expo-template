import React from 'react';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

export const BottomSheetBackground = () => {
  return <Animated.View pointerEvents="none" style={styles.container} />;
};

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background.main,
  },
}));
