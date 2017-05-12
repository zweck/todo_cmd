const fs = require('fs');
const path = require('path');
const config = require('./config');
const glob = require('glob');
const chalk = require('chalk');

const getAllTodoFiles = function(){
  let files = glob.sync( `${config.todoRoot}/**/*.md` );
  let todos = files.reduce( (todos, file) => {
    let todo = fs.readFileSync(file, 'utf8');
    todos.push(todo);
    return todos;
  }, [] );
  return todos;
}

const listDone = function(){
  let todos = getAllTodoFiles();
  let done = todos.reduce( (doneList, todo) => {
    if(todo.match(/(\[x])(.*)/gm)) doneList = doneList.concat(todo.match(/(\[x])(.*)/gm));
    return doneList;
  }, []);

  done.forEach( done => console.log(chalk.red(done)) );
}

const listNotDone = function(){
  let todos = getAllTodoFiles();
  let done = todos.reduce( (doneList, todo) => {
    if(todo.match(/(\[ ])(.*)/gm)) doneList = doneList.concat(todo.match(/(\[ ])(.*)/gm));
    return doneList;
  }, []);

  done.forEach( done => console.log(chalk.green(done)) );
}

module.exports = { listDone, listNotDone }