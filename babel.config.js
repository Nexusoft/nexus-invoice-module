const reactOptimizePreset = [
  '@babel/plugin-transform-react-constant-elements',
  '@babel/plugin-transform-react-inline-elements',
  'babel-plugin-transform-react-remove-prop-types',
  'babel-plugin-transform-react-pure-class-to-function',
];

const devPlugins = [];

const prodPlugins = ['babel-plugin-dev-expression', ...reactOptimizePreset];

module.exports = function (api) {
  const development = process.env.NODE_ENV !== 'production';
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // Replace this with the Electron version that your target Nexus Wallet version uses
          targets: { electron: '8.2.3' },
        },
      ],
      ['@babel/preset-react', { development }],
    ],
    plugins: [
      [
        'babel-plugin-module-resolver',
        {
          root: ['./src/'],
        },
      ],
      ['@babel/plugin-proposal-optional-chaining', { loose: false }],
      ...(development ? devPlugins : prodPlugins),
    ],
  };
};
