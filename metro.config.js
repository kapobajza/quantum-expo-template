// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
config.resolver.sourceExts.push('sql');

module.exports = config;
