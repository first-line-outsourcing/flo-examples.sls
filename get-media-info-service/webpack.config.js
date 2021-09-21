const path = require('path');
const slsw = require('serverless-webpack');
const WebpackPermissionsPlugin = require('./webpack-permissions.plugin');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const destPath = path.join(__dirname, '.webpack');

module.exports = {
  output: {
    libraryTarget: 'commonjs',
    path: destPath,
    filename: '[name].js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  mode: 'development',
  externals: [nodeExternals({ modulesDir: path.resolve(__dirname, './node_modules') })],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: [/\.(test|e2e)\.ts$/],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'bin', to: 'bin' }],
    }),
    new WebpackPermissionsPlugin(),
  ],
};
