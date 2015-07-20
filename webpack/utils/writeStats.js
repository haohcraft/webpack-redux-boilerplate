var fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  filepath = path.resolve(__dirname, '../../webpack-stats.json');

module.exports = function writeStats(stats) {

  var publicPath = this.options.output.publicPath;
  var entry = this.options.entry;

  var json = stats.toJson();
  // console.log("stats json", json);

  // get chunks by name and extensions
  function getChunks(name, ext) {
    ext = ext || 'js';
    var chunk = json.assetsByChunkName[name];

    // a chunk could be a string or an array, so make sure it is an array
    if (!(Array.isArray(chunk))) {
      chunk = [chunk];
    }

    console.log(chunk);

    return chunk
      // filter by extension
      .filter(function (chunkName) {
        return path.extname(chunkName) === '.' + ext;
      })
      .map(function (chunkName) {
        return publicPath + chunkName;
      });
  }

  var scripts = _.without(Object.keys(entry), 'vendor').map(function(e) {
    return getChunks(e, 'js');
  });

  var csss = _.without(Object.keys(entry), 'vendor').map(function(e) {
    return getChunks(e, 'css');
  });

  var content = {
    script: _.flatten(scripts),
    css: _.flatten(csss)
  };

  fs.writeFileSync(filepath, JSON.stringify(content));

};
