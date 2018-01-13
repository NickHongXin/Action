const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const openBrowser = require('react-dev-utils/openBrowser');

const config = require('./webpack.config.js');
const options = {
  contentBase: './',
  host: 'localhost',
  historyApiFallback: true,
  inline: true
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(8088, 'localhost', () => {
  console.log('dev server listening on port 8088');
  openBrowser('http://localhost:8088');
});