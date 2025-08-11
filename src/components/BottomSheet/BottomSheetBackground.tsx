import React from 'react';
import Animated from 'react-native-reanimated';

import { createStyleSheet, useStyles } from '@/theme';

export const BottomSheetBackground = () => {
  const styles = useStyles(stylesheet);

  return <Animated.View pointerEvents="none" style={styles.container} />;
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background.main,
  },
}));
