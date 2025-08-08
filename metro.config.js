/* eslint-disable @typescript-eslint/no-require-imports */
const { getDefaultConfig } = require('expo/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
config.resolver.sourceExts.push('sql');

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
module.exports = withStorybook(config, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
  onDisabledRemoveStorybook: true,
});
