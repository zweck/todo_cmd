const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const tilde = require('tilde-expansion');

const init = function({ dir }){
  tilde(dir, (expandedDir) => {
    if (!fs.existsSync(expandedDir)) return console.log(chalk.red('Directory for workbook doesnt exist'));
    console.log(chalk.green(`Initializing new todo workbook in ${dir}`));
  });
};

module.exports = init;