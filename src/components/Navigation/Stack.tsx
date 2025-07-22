import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack as ExpoStack } from 'expo-router';
import React, { ComponentProps } from 'react';

type StackProps = Omit<ComponentProps<typeof ExpoStack>, 'screenOptions'> & {
  screenOptions?: NativeStackNavigationOptions;
};

export const StackNoHeader = (props: StackProps) => {
  return (
    <ExpoStack
      {...props}
      screenOptions={{
        ...props.screenOptions,
        headerShown: false,
      }}
    />
  );
};
