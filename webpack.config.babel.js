import path from 'path';

export default {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'app.js',
  },
  node: { fs: 'empty' },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.join(process.cwd(), 'src/shared'), 'node_modules'],
    alias: {
      // because victory library requires react
      react$: path.resolve(__dirname, 'src/react.js'),
      'react-dom$': path.resolve(__dirname, 'src/reactDOM.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          {
            loader: 'svgo-loader',
            options: {
              externalConfig: 'svgo-config.json',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
