/**
 * @param {{
 *  cache: (boolean) => void
 * }} api
 * @returns
 */
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        'babel-preset-expo',
        {
          'react-compiler': {},
        },
      ],
    ],
    plugins: [
      ['inline-import', { extensions: ['.sql'] }],
      [
        'react-native-unistyles/plugin',
        {
          root: 'src',
        },
      ],
    ],
  };
};
