const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const tilde = require('tilde-expansion');
const shell = require('shelljs');
const appRootDir = require('app-root-dir').get();
const setConfigProp = require('./setConfigProp');
const newTodoMonth = require('./newTodoMonth');

const init = function({ dir, withGit=false }){
  tilde(dir, (expandedDir) => {
    if (!fs.existsSync(expandedDir)) return console.log(chalk.red('Directory for workbook doesnt exist'));
    console.log(chalk.green(`Initializing new todo workbook in ${dir}`));
    const configPath = path.join(appRootDir, 'config.json');
    const todoRoot = path.join(expandedDir, 'todo');

    if (!fs.existsSync( todoRoot )) fs.mkdirSync( todoRoot );
    writeConfig( configPath, todoRoot );
    setConfigProp({ todoRoot, withGit });
    newTodoMonth( todoRoot );
    if (withGit) {
      console.log(chalk.blue('Initialising with git'));
      shell.cd(expandedDir);
      shell.exec('git init');
      shell.exec('git add --all');
      shell.exec('git commit -m "Initial Commit"');
    }
  });
};

const writeConfig = function(configPath){
  console.log(chalk.green('Writing config'));
  fs.writeFileSync(configPath, JSON.stringify({}));
}

module.exports = init;