const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const tilde = require('tilde-expansion');
const appRootDir = require('app-root-dir').get();
const setConfigProp = require('./setConfigProp');

const init = function({ dir }){
  tilde(dir, (expandedDir) => {
    if (!fs.existsSync(expandedDir)) return console.log(chalk.red('Directory for workbook doesnt exist'));
    console.log(chalk.green(`Initializing new todo workbook in ${dir}`));
    const configPath = path.join(appRootDir, 'config.json');
    const todoRoot = path.join(expandedDir, 'todo');

    if (!fs.existsSync( todoRoot )) fs.mkdirSync( todoRoot );
    if (fs.existsSync( configPath )) return loadConfig( configPath );
    if (!fs.existsSync( configPath )) writeConfig( configPath, todoRoot );
    setConfigProp({ todoRoot });
  });
};

const loadConfig =  function(configPath){
  console.log(chalk.green('Using existing config'));
}

const writeConfig = function(configPath){
  console.log(chalk.green('Writing config'));
  fs.writeFileSync(configPath, JSON.stringify({}));
}

module.exports = init;