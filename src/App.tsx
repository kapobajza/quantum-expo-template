/* eslint-disable @typescript-eslint/no-require-imports */
import '@expo/metro-runtime';
import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';
import { type ComponentType } from 'react';

let AppEntryPoint: ComponentType = App;

if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  AppEntryPoint = require('../.rnstorybook').default as ComponentType;
}

renderRootComponent(AppEntryPoint);
