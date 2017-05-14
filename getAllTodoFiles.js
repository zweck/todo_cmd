const fs = require('fs');
const glob = require('glob');
const config = require('./config');

const getAllTodoFiles = function(){
  let files = glob.sync( `${config.todoRoot}/**/*.md` );
  let todos = files.reduce( (todos, file) => {
    let todo = fs.readFileSync(file, 'utf8');
    todos.push(todo);
    return todos;
  }, [] );
  return todos;
}

module.exports = getAllTodoFiles;