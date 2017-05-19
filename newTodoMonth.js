const path = require('path');
const fs = require('fs');
const config = require('./loadConfig');
const chalk = require('chalk');
const mkdirp = require('mkdirp');

const month = `0${new Date().getMonth()+1}`.slice(-2);
const year = `${new Date().getFullYear()}`;
const day = `0${new Date().getDate()+1}`.slice(-2);

const newTodoMonth = function(todoRoot){
  todoRoot = typeof todoRoot === 'string' ? todoRoot : config.todoRoot;
  const template = config.template;
  const templatePath = `${template.replace(/year/g, year).replace(/month/g, month).replace(/day/g, day)}.md`;
  const todayTodo = path.join(todoRoot, templatePath);

  if (!fs.existsSync( todoRoot )) return console.log(chalk.red('Something has gone wrong, we can\'t create a new todo month'));
  if (!fs.existsSync( todayTodo )) createMonthFolder( todayTodo ); 
}

const createMonthFolder = function( newTodoMd ){
  console.log(chalk.green(`Creating ${newTodoMd}`));
  if(path.parse(newTodoMd).base !== path.parse(newTodoMd).name && path.extname(newTodoMd) === '.md') {
    mkdirp.sync( newTodoMd.split('/').slice(0, newTodoMd.split('/').length - 1).join("/") );
  }
  if (fs.existsSync( newTodoMd )) return console.log(chalk.red('Todo for today exists'));
  fs.writeFileSync(newTodoMd, `#### Todos for ${year}/${month}/${day}`);
}

module.exports = newTodoMonth;