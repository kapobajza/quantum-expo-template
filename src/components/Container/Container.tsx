import { get } from 'lodash';
import React from 'react';
import { Platform, SafeAreaView, View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Loader } from '@/components/Loader';
import { Text } from '@/components/Text';
import { ThemeSpacing } from '@/theme/tokens/spacing';

export interface ContainerProps extends ViewProps {
  center?: boolean | 'horizontal' | 'vertical';
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  ErrorComponent?: React.ReactNode;
  LoaderComponent?: React.ReactNode;
  useSafeAreas?: boolean;
  fill?: boolean;
  bottomSpacing?: boolean | ThemeSpacing;
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
  bottomSpacing,
  ...props
}: ContainerProps) => {
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
    <RootComponent
      style={StyleSheet.compose(styles.root({ center, fill }), style)}
      {...props}
    >
      {Component}
      {bottomSpacing && Platform.OS === 'android' && (
        <View style={styles.bottom(bottomSpacing)} />
      )}
    </RootComponent>
  );
};

const styles = StyleSheet.create((theme, { insets }) => ({
  root: (props: Pick<ContainerProps, 'center' | 'fill'>) => {
    const centerHorizontal =
      props.center === 'horizontal' || props.center === true;
    const centerVertical = props.center === 'vertical' || props.center === true;

    return {
      margin: theme.spacing('md'),
      alignItems: centerHorizontal ? 'center' : undefined,
      justifyContent: centerVertical ? 'center' : undefined,
      flex: props.fill ? 1 : undefined,
      backgroundColor: theme.colors.background.main,
    };
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
  },
  bottom: (spacing: true | ThemeSpacing) => ({
    paddingBottom:
      typeof spacing === 'boolean'
        ? insets.bottom
        : insets.bottom + (get(theme.spacing, spacing, 0) as number),
  }),
}));
