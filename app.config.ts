import { ExpoConfig } from 'expo/config';

const appId = 'com.quantum.expo.template';

export default {
  name: 'Quantum Expo Template',
  slug: 'quantum-expo-template',
  version: '1.0.0',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    package: appId,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-web-browser',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    'expo-secure-store',
    'expo-sqlite',
    'expo-localization',
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/SpaceMono-Regular.ttf',
          './assets/fonts/SpaceMono-Bold.ttf',
          './assets/fonts/SpaceMono-Italic.ttf',
          './assets/fonts/SpaceMono-BoldItalic.ttf',
        ],
        android: {
          fonts: [
            {
              fontFamily: 'SpaceMono-Regular',
              fontDefinitions: [
                {
                  path: './assets/fonts/SpaceMono-Regular.ttf',
                  weight: 400,
                },
                {
                  path: './assets/fonts/SpaceMono-Bold.ttf',
                  weight: 700,
                },
                {
                  path: './assets/fonts/SpaceMono-Italic.ttf',
                  weight: 400,
                  style: 'italic',
                },
                {
                  path: './assets/fonts/SpaceMono-BoldItalic.ttf',
                  weight: 700,
                  style: 'italic',
                },
              ],
            },
          ],
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED !== 'true',
  },
  scheme: 'my-app',
  ios: {
    bundleIdentifier: appId,
  },
} satisfies ExpoConfig;
