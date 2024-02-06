const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const resolve = filePath => path.join(__dirname, filePath);
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: resolve('../src/lunarDatePicker.tsx'),
  devtool: isDev ? 'eval-cheap-source-map' : 'hidden-source-map',
  // devtool: 'eval-cheap-source-map',
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        test: /\.ts[x]?$/,
        parallel: 4,
        minify: TerserPlugin.swcMinify,
        terserOptions: {
          compress: {
            ecma: 5,
            drop_console: !isDev,
          },
        },
      }),
    ],
  },
  output: {
    path: resolve('../dist/'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    clean: true,
    library: {
      name: 'ant-lunar-picker',
      type: 'umd',
      umdNamedDefine: true,
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
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintWebpackPlugin({
      context: 'src/',
      extensions: ['js', 'jsx', 'ts', 'tsx']
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        use: [
          {
            loader:'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ]
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'antd': 'antd'
  },
};
