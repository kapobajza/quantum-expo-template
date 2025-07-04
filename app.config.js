const appBundleIdentifier = 'com.quantum.sample';

/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  name: '{{expo-app-name}}',
  slug: '{{expo-app-slug}}',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: '{{expo-app-scheme}}',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: appBundleIdentifier,
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    package: appBundleIdentifier,
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
        fonts: ['./assets/fonts/SpaceMono-Regular.ttf'],
        android: {
          fonts: [
            {
              fontFamily: 'Space Mono',
              fontDefinitions: [
                {
                  path: './path/to/SourceSerif4-ExtraBold.ttf',
                  weight: 800,
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
    reactCompiler: true,
  },
  extra: {
    supportsRTL: true,
  },
};
