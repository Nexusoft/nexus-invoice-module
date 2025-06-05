const browserslistQuery = require('nexus-module/lib/browserslistQuery').default;

const reactOptimizePreset = [
  '@babel/plugin-transform-react-constant-elements',
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
      ['@babel/preset-env', { targets: browserslistQuery }],
      ['@babel/preset-react', { development, runtime: 'automatic' }],
    ],
    plugins: [
      [
        'babel-plugin-module-resolver',
        {
          root: ['./src/shared/'],
        },
      ],
      ['@babel/plugin-proposal-optional-chaining', { loose: false }],
      ...(development ? devPlugins : prodPlugins),
    ],
  };
};
