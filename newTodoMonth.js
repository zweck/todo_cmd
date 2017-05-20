const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const config = require('./loadConfig');
const getTodoPath = require('./getTodoPath').getTodoPath;
const today = require('./getTodoPath').today;

const newTodoMonth = function(todoRoot){
  todoRoot = typeof todoRoot === 'string' ? todoRoot : config.todoRoot;
  const templatePath = getTodoPath();
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
  fs.writeFileSync(newTodoMd, `#### Todos for ${today.year}/${today.month}/${today.day}`);
}

module.exports = newTodoMonth;