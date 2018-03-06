const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

const devConfig = merge(baseConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    })
  ]
});

module.exports = devConfig;