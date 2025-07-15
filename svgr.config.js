/** @type {import('@svgr/core').Config} */
module.exports = {
  outDir: 'src/components/Icon/raw',
  typescript: true,
  jsxRuntime: 'automatic',
  native: true,
  dimensions: false,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      'removeXMLNS',
      'removeXlink',
      'convertStyleToAttrs',
      {
        name: 'removeAttrs',
        params: {
          attrs: [
            'xml:space',
            'image-rendering',
            'shape-rendering',
            'text-rendering',
          ],
          elemSeparator: '#',
        },
      },
    ],
  },
};
