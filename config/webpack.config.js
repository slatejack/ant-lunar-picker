const path = require('path');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const resolve = filePath => path.join(__dirname, filePath);
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './app.ts',
  devtool: isDev ? 'eval-cheap-source-map' : 'hidden-source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          compress: {
            ecma: 5,
            drop_console: !isDev,
          },
        },
      }),
    ]
  },
  output: {
    path: resolve('../dist/'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    library: {
      type: 'commonjs-static',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
    alias: {
      '@': resolve('../src'),
    },
    fallback: {
      'stream': require.resolve('stream-browserify'),
      'buffer': require.resolve('buffer/')
      // 其他需要的 node.js 核心模块
    },
  },
  plugins: [new ESLintWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
};
