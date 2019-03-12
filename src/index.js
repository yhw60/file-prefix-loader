const path = require('path');
const loaderUtils = require('loader-utils');
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const separator = 'module.exports = __webpack_public_path__ +';
  let outputPath = source.toString();
  let hasSep = false;
  if (outputPath.indexOf(separator) > -1) {
    hasSep = true;
    outputPath = outputPath.split(separator)[1];
    outputPath = outputPath.substr(0, outputPath.length - 1);
  }
  if (options && options.prefix) {
    try {
      outputPath = JSON.parse(outputPath);
      outputPath = path.join(options.prefix, outputPath);
      outputPath = outputPath.substr(1);
    } catch (e) {
      console.log('json parse error:', e);
    }
  }
  if (hasSep) {
    outputPath = `${separator}${JSON.stringify(outputPath)}`;
  }
  // console.log('output:  ',`${outputPath}`);
  return `${outputPath}`;
}
module.exports.raw = true;