const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const publicDir = __dirname + '/public';

module.exports = merge(common, {
  devServer: {
    historyApiFallback: true,
    contentBase: publicDir
  }
})