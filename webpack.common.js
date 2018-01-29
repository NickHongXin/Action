var publicDir = __dirname + '/public';
var path = require('path');

module.exports = {
  entry: [
    './src/app.js'
  ],
  output: {
    path: publicDir,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: "html-loader"
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'url'
    }],
    rules: [{
      test: /\.js(x)?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: [
          ["es2015", {
            modules: false
          }],
          "stage-0",
          "react"
        ],
        plugins: [
          "transform-class-properties"
        ]
      }
    }, {
      test: /\.css$/,
      use: [
        "style-loader", {
          loader: "css-loader",
          options: {
            modules: true, // default is false
            sourceMap: true,
            importLoaders: 1,
            localIdentName: "[name]--[local]--[hash:base64:8]"
          }
        },
        "postcss-loader"
      ]
    }, ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
