var fs = require('fs');
var path = require('path');
var pkg = require('./package');

var buildpath = path.join(__dirname, package['main-build']);
var srcpath =  path.join(__dirname, package['main-src']);

module.exports = (function() {
  if(fs.existsSync(buildpath))
    return require(buildpath);
  console.log("Project not built, running in debug mode... (Use babel-node!)");
  return require(srcpath);
})();
