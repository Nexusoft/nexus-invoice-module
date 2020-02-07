import path from 'path';
import baseConfig from './webpack.config.babel';

const port = 24011;
const publicPath = `http://localhost:${port}/`;

const config = {
  ...baseConfig,
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index',
  devServer: {
    port,
    publicPath,
    inline: true,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(process.cwd(), 'dist'),
    watchContentBase: true,
  },
};

export default config;
