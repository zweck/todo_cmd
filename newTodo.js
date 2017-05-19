const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const tilde = require('tilde-expansion');
const mkdirp = require('mkdirp');
const shell = require('shelljs');
const config = require('./loadConfig');
const getAllTodosFromFileArray = require('./getAllTodosFromFileArray');

const month = `0${new Date().getMonth()+1}`.slice(-2);
const year = `${new Date().getFullYear()}`;
const day = `0${new Date().getDate()+1}`.slice(-2);

const addNewTodo = function(args){
  let item = args._[1];
  let dir = config.todoRoot;
  let template = config.template;
  tilde(dir, (expandedDir) => {
    const todoRoot = config.todoRoot;
    const templatePath = `${template.replace(/year/g, year).replace(/month/g, month).replace(/day/g, day)}.md`;
    const todayTodo = path.join(todoRoot, templatePath);

    if (!fs.existsSync( currentMonthFolder )) mkdirp.sync( currentMonthFolder );
    if (!fs.existsSync( todayTodo )) fs.writeFileSync(todayTodo, `#### Todos for ${year}_${month}_${day}`);
    const todayTodoFile = fs.readFileSync(todayTodo, 'utf-8');
    const todosFromFile = getAllTodosFromFileArray([todayTodoFile]);
    let todoFileAsArray = todayTodoFile.split(/\r?\n/);
    if (!todosFromFile.length) todoFileAsArray.push(`[ ] ${item}`);
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