const fs = require('fs');
const path = require('path');
const config = require('./config');
const glob = require('glob');

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
  let todoCount = 0;
  todos.forEach( todo => {
    todoCount = todoCount + (todo.match(/[[ ]]/g) || []).length;
  });
  console.log(todoCount)
}

const listNotDone = function(){
  let todos = getAllTodoFiles();
  let todoCount = 0;
  todos.forEach( todo => {
    todoCount = todoCount + (todo.match(/[[x]]/g) || []).length;
  });
  console.log(todoCount)
}

module.exports = { listDone, listNotDone }