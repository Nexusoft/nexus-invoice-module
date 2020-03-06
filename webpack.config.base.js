/**
 * Base webpack config used across other specific configs
 */

import path from 'path';

export default {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

  output: {
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.join(process.cwd(), 'src/shared'), 'node_modules'],
    alias: {
      // because victory library requires react
      react$: path.resolve(__dirname, 'src/react.js'),
      'react-dom$': path.resolve(__dirname, 'src/reactDOM.js'),
    },
  },
};
