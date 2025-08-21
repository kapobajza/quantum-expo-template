import React from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const Background = ({ style, ...props }: ViewProps) => {
  return <View style={[styles.root, style]} {...props} />;
};

const styles = StyleSheet.create((theme) => ({
  root: {
    backgroundColor: theme.colors.background.main,
    flex: 1,
  },
}));
