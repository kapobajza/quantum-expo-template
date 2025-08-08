import React from 'react';
import { View, ViewProps } from 'react-native';

import { createStyleSheet, useStyles } from '@/theme';

export const ListItem = ({ style, ...props }: ViewProps) => {
  const styles = useStyles(stylesheet);
  return <View style={[styles.listItem, style]} {...props}></View>;
};

const stylesheet = createStyleSheet((theme) => ({
  listItem: {
    marginHorizontal: theme.spacing.md,
  },
}));
