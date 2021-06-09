import path from 'path';

export default {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'app.js',
  },
  target: 'web',
  module: {
    rules: [
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
  resolve: {
    alias: {
      // because victory library requires react
      react$: path.resolve(__dirname, 'src/proxy/react.js'),
      'react/jsx-runtime$': path.resolve(__dirname, 'src/proxy/jsxRuntime.js'),
      'react/jsx-dev-runtime$': path.resolve(
        __dirname,
        'src/proxy/jsxDevRuntime.js'
      ),
      react$: path.resolve(__dirname, 'src/proxy/react.js'),
      redux$: path.resolve(__dirname, 'src/proxy/redux.js'),
    },
  },
};
