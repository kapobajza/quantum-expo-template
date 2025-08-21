import { Link as ExpoLink, LinkProps as ExpoLinkProps } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';

export type LinkProps = ExpoLinkProps;

export const Link = ({ style, ...props }: LinkProps) => {
  return <ExpoLink style={[styles.link, style]} {...props} />;
};

const styles = StyleSheet.create((theme) => ({
  link: {
    color: theme.colors.primary[300],
    textDecorationLine: 'underline',
  },
}));
