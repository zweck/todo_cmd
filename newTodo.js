const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const tilde = require('tilde-expansion');
const mkdirp = require('mkdirp');
const config = require('./config');
const getAllTodosFromFileArray = require('./getAllTodosFromFileArray');

const month = `0${new Date().getMonth()+1}`.slice(-2);
const year = `${new Date().getFullYear()}`;
const day = `0${new Date().getDate()+1}`.slice(-2);

const addNewTodo = function({item}){
  let dir = config.todoRoot;
  tilde(dir, (expandedDir) => {
    const todoRoot = config.todoRoot;
    const currentYearFolder = path.join(todoRoot, year);
    const currentMonthFolder = path.join(currentYearFolder, month);
    const todayTodo = path.join(currentMonthFolder, `${year}_${month}_${day}.md`);

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
        `[ ] ${item}`
      );
    }
    let newFile = todoFileAsArray.join("\r\n");
    fs.writeFileSync(todayTodo, newFile);
    console.log(chalk.green(`Added new todo to ${todayTodo}`));
  });
};


module.exports = addNewTodo;