const path = require('path');
const fs = require('fs');
const config = require('./config');
const chalk = require('chalk');
const mkdirp = require('mkdirp');

const month = `0${new Date().getMonth()+1}`.slice(-2);
const year = `${new Date().getFullYear()}`;
const day = `0${new Date().getDate()+1}`.slice(-2);

const newTodoMonth = function(){
  const todoRoot = config.todoRoot;
  const currentYearFolder = path.join(todoRoot, year);
  const currentMonthFolder = path.join(currentYearFolder, month);

  if (!fs.existsSync( todoRoot )) return console.log(chalk.red('Something has gone wrong, we can\'t create a new todo month'));
  if (!fs.existsSync( currentMonthFolder )) createMonthFolder( currentMonthFolder ); 
}

const createMonthFolder = function( currentMonthFolder ){
  console.log(chalk.green(`Creating month ${month}`));
  mkdirp.sync( currentMonthFolder );
  const newTodoMd = path.join(currentMonthFolder, `${year}_${month}_${day}.md`);
  if (fs.existsSync( newTodoMd )) return console.log(chalk.red('Todo for today exists'));
  fs.writeFileSync(newTodoMd, `#### Todos for ${year}_${month}_${day}`);
}

module.exports = newTodoMonth;