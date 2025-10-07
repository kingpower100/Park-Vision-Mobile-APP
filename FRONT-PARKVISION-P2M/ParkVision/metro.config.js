const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolver configuration to handle web platform
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Configure web-specific resolver
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Add web-specific extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'web.js', 'web.ts', 'web.tsx'];

// Create alias for web platform to use stub components
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native-maps': require.resolve('./app/components/react-native-maps.web.tsx'),
};

// Exclude problematic native modules for web platform
config.resolver.blockList = [
  /react-native-maps\/lib\/MapMarkerNativeComponent\.js$/,
  /react-native-maps\/lib\/MapViewNativeComponent\.js$/,
  /react-native-maps\/lib\/MapCalloutNativeComponent\.js$/,
  /react-native-maps\/lib\/MapPolygonNativeComponent\.js$/,
  /react-native-maps\/lib\/MapPolylineNativeComponent\.js$/,
];

module.exports = config;
