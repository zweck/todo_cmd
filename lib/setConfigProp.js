const path = require('path');
const fs = require('fs');
const appRootDir = __filename.split('/').slice(0, __filename.split('/').length - 1).join("/");
const chalk = require('chalk');
const config = require('./loadConfig');

const setConfigProp = function(object){
  const configPath = path.join(appRootDir, '../config.json');
  console.log(appRootDir)
  fs.writeFileSync(configPath, JSON.stringify(Object.assign({}, config, object)));
  console.log(chalk.blue(`Written to ${configPath}`));
}

module.exports = setConfigProp;