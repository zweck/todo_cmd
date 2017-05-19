const path = require('path');
const fs = require('fs');
const appRootDir = require('app-root-dir').get();
const chalk = require('chalk');
const config = require('./loadConfig');

const setConfigProp = function(object){
  const configPath = path.join(appRootDir, 'config.json');
  fs.writeFileSync(configPath, JSON.stringify(Object.assign({}, config, object)));
  console.log(chalk.blue(`Written to ${configPath}`));
}

module.exports = setConfigProp;