import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  View,
  ViewProps,
} from 'react-native';

import { Text } from '@/components/Text';
import { createStyleSheet, useStyles } from '@/theme';

export interface LoaderProps {
  size?: ActivityIndicatorProps['size'];
  fill?: boolean;
  style?: ViewProps['style'];
  title?: string;
  color?: string;
  center?: boolean;
}

export const Loader = ({
  size,
  fill,
  style,
  title,
  color,
  center,
}: LoaderProps) => {
  const styles = useStyles(stylesheet);

  return (
    <View style={[styles.container({ fill, center }), style]}>
      {title ? (
        <Text variant="emphasis" center>
          {title}
        </Text>
      ) : null}
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: (props: Pick<LoaderProps, 'fill' | 'center'>) => ({
    flex: props.fill ? 1 : undefined,
    justifyContent: 'center',
    alignItems: props.center ? 'center' : undefined,
    gap: theme.spacing['4'],
    margin: theme.spacing['4'],
  }),
}));
