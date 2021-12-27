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
      react$: path.resolve(__dirname, 'src/proxy/react.js'),
      'react-dom$': path.resolve(__dirname, 'src/proxy/react-dom.js'),
      'react/jsx-runtime$': path.resolve(__dirname, 'src/proxy/jsxRuntime.js'),
      'react/jsx-dev-runtime$': path.resolve(
        __dirname,
        'src/proxy/jsxDevRuntime.js'
      ),
    },
  },
};
