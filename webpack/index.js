// Register babel to have ES6 support on the server
require("babel/register");
import path from 'path';
import debug from 'debug';

const env = process.env.NODE_ENV || 'dev';


var configWebpack;
var config = require("../config/" + env);;

if (env !== 'prod' && env !== 'test') {

  configWebpack = require("./" + env +'.config');
  const serverOptions = {
    contentBase: `http://${config.HOST}:${config.PORT}`,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: configWebpack.output.publicPath,
    headers: {"Access-Control-Allow-Origin": "*"},
    stats: {colors: true}
  };
  debug('dev')("configWebpack: ", configWebpack);
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var compiler = webpack(configWebpack);
  var devServer = new WebpackDevServer(compiler, serverOptions);

  devServer.listen(config.PORT, '0.0.0.0', function (err, result) {
    if (err) console.log(err);
    debug('dev')('webpack-dev-server listen on port %s', config.PORT);
  });
} else {

  module.exports = [
    require(env +'.config')
  ];
}