import { Link as ExpoLink, LinkProps as ExpoLinkProps } from 'expo-router';
import React from 'react';

import { createStyleSheet, useStyles } from '@/theme';

export type LinkProps = ExpoLinkProps;

export const Link = ({ style, ...props }: LinkProps) => {
  const styles = useStyles(stylesheet);
  return <ExpoLink style={[styles.link, style]} {...props} />;
};

const stylesheet = createStyleSheet((theme) => ({
  link: {
    color: theme.colors.primary[300],
    textDecorationLine: 'underline',
  },
}));
