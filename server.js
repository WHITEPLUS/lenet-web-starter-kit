const webpack = require('webpack');
const server = require('webpack-dev-server');
const config = require('./webpack.config.js');

config.entry.push(
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server'
);

config.plugins.push(new webpack.HotModuleReplacementPlugin());

console.log(config);

new server(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});
