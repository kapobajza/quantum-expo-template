import React from 'react';
import { View, ViewProps } from 'react-native';

import { createStyleSheet, useStyles } from '@/theme';

export const Background = ({ style, ...props }: ViewProps) => {
  const styles = useStyles(stylesheet);

  return <View style={[styles.root, style]} {...props} />;
};

const stylesheet = createStyleSheet((theme) => ({
  root: {
    backgroundColor: theme.colors.background.main,
    flex: 1,
  },
}));
