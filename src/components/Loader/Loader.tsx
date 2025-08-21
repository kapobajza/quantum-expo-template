import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  ColorValue,
  View,
  ViewProps,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '@/components/Text';

export interface LoaderProps {
  size?: ActivityIndicatorProps['size'];
  fill?: boolean;
  style?: ViewProps['style'];
  title?: string;
  color?: ColorValue;
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

const styles = StyleSheet.create((theme) => ({
  container: (props: Pick<LoaderProps, 'fill' | 'center'>) => ({
    flex: props.fill ? 1 : undefined,
    justifyContent: 'center',
    alignItems: props.center ? 'center' : undefined,
    gap: theme.spacing(4),
    margin: theme.spacing(4),
  }),
}));
