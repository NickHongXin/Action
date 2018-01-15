// const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
var publicDir = __dirname+'/public'

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: publicDir,
    filename: 'bundle.js',
    publicPath:'/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options:{
            presets: ['react', ['es2015', {modules: false}]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          {
            loader:'css-loader',
            options:{
              modules:true,
              sourceMap:true,
              importLoaders:1,
              localIdentName:'[name]--[local]--[hash:base64:8]'
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  devServer:{
    historyApiFallback: true,
    contentBase: publicDir
  },
  resolve:{
    extensions:['.js', '.jsx']
  }
};
