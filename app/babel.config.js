module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-env', {targets: {node: 'current'}}],
  ],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@types': './__types__',
          '@routes': './src/routes',
          '@tools': './src/tools',
          '@views': './src/views',
          '@state': './src/state',
          '@mocks': './__mocks__',
        },
      },
    ],
  ],
};
