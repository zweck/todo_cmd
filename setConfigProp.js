const path = require('path');
const fs = require('fs');
const appRootDir = require('app-root-dir').get();
const config = require('./loadConfig');

const setConfigProp = function(object){
  const configPath = path.join(appRootDir, 'config.json');
  fs.writeFileSync(configPath, JSON.stringify(Object.assign({}, config, object)));
}

module.exports = setConfigProp;