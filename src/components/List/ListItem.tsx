import React from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const ListItem = ({ style, ...props }: ViewProps) => {
  return <View style={[styles.listItem, style]} {...props}></View>;
};

const styles = StyleSheet.create((theme) => ({
  listItem: {
    marginHorizontal: theme.spacing('md'),
  },
}));
