const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const tilde = require('tilde-expansion');
const mkdirp = require('mkdirp');
const shell = require('shelljs');
const config = require('./loadConfig');
const getAllTodosFromFileArray = require('./getAllTodosFromFileArray');
const getTodoPath = require('./getTodoPath').getTodoPath;
const today = require('./getTodoPath').today;

const addNewTodo = function(args){
  let item = args._[1];
  let dir = config.todoRoot;
  let template = config.template;
  tilde(dir, (expandedDir) => {
    const todoRoot = config.todoRoot;
    const templatePath = getTodoPath();
    const todayTodo = path.join(todoRoot, templatePath);

    if(path.parse(todayTodo).base !== path.parse(todayTodo).name && path.extname(todayTodo) === '.md') {
      let currentMonthFolder = mkdirp.sync( todayTodo.split('/').slice(0, todayTodo.split('/').length - 1).join("/") );
      if (currentMonthFolder && !fs.existsSync( currentMonthFolder )) mkdirp.sync( currentMonthFolder );
    }

    if (!fs.existsSync( todayTodo )) fs.writeFileSync(todayTodo, `#### Todos for ${today.year}_${today.month}_${today.day}`);
    const todayTodoFile = fs.readFileSync(todayTodo, 'utf-8');
    const todosFromFile = getAllTodosFromFileArray([todayTodoFile]);
    let todoFileAsArray = todayTodoFile.split(/\r?\n/);
    if (!todosFromFile.length) todoFileAsArray.push(`- [ ] ${item}`);
    if (todosFromFile.length) {
      todoFileAsArray.splice( 
        todoFileAsArray.indexOf( todoFileAsArray.find( line => line.match(/(\[x])(.*)|(\[\s])(.*)/) )), 
        0, 
        `- [ ] ${item}`
      );
    }
    let newFile = todoFileAsArray.join("\r\n");
    fs.writeFileSync(todayTodo, newFile);
    console.log(chalk.green(`Added new todo to ${todayTodo}`));
    if (config.withGit) {
      shell.cd(expandedDir);
      shell.exec(`git add ${todayTodo}`);
      shell.exec(`git commit -m "Added now todo to ${todayTodo}"`);
    }
  });
};


module.exports = addNewTodo;