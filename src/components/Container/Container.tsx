import React from 'react';
import { SafeAreaView, View, ViewProps } from 'react-native';

import { Loader } from '@/components/Loader';
import { Text } from '@/components/Text';
import { createStyleSheet, useStyles } from '@/theme';

export interface ContainerProps extends ViewProps {
  center?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  ErrorComponent?: React.ReactNode;
  LoaderComponent?: React.ReactNode;
  useSafeAreas?: boolean;
  fill?: boolean;
}

export const Container = ({
  center,
  isLoading,
  isError,
  error,
  children,
  ErrorComponent,
  LoaderComponent,
  style,
  useSafeAreas,
  fill,
  ...props
}: ContainerProps) => {
  const styles = useStyles(stylesheet);
  let Component = children;
  const RootComponent = useSafeAreas ? SafeAreaView : View;

  if (error && isError && !isLoading) {
    Component = ErrorComponent ?? (
      <View style={styles.errorContainer}>
        <Text variant="h5" style={styles.errorText}>
          {error.message}
        </Text>
      </View>
    );
  }

  if (isLoading) {
    Component = LoaderComponent ?? <Loader fill center size="large" />;
  }

  return (
    <RootComponent style={[styles.root({ center, fill }), style]} {...props}>
      {Component}
    </RootComponent>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  root: (props: Pick<ContainerProps, 'center' | 'fill'>) => ({
    margin: theme.spacing['4'],
    alignItems: props.center ? 'center' : undefined,
    justifyContent: props.center ? 'center' : undefined,
    flex: props.fill ? 1 : undefined,
  }),
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
  },
}));
