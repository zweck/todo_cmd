const fs = require('fs');
const path = require('path');
const config = require('./config');
const glob = require('glob');
const chalk = require('chalk');
const inquirer = require('inquirer');
const getAllTodosFromFileArray = require('./getAllTodosFromFileArray');
const getAllTodoFiles = require('./getAllTodoFiles');

const toggleTodos = function(newList){
  let files = glob.sync( `${config.todoRoot}/**/*.md` );
  files.forEach( file => {
    let todo = fs.readFileSync(file, 'utf8');
    todo = todo.split(/\r?\n/);
    todo = todo.map( todoLine => {
      let replaceWithLine = Object.keys(newList).find( toReplace => (todoLine.indexOf(toReplace) > -1 && newList[toReplace] !== toReplace) );
      if (replaceWithLine) return todoLine.match(/(\[x])/g) ? todoLine.replace(/(\[x])/g, '[ ]') : todoLine.replace(/(\[\s])/g, '[x]');
      return todoLine;
    });
    fs.writeFileSync(file, todo.join("\r\n"));
  });
}

const list = function(){
  let allTodo = getAllTodosFromFileArray( getAllTodoFiles() );
  let choices = allTodo.map( choice => {
    if(choice.match(/(\[x])/g)) return { name: choice.replace(/(\[x])/g, ''), checked: true }
    return { name: choice.replace(/(\[\s])/g, ''), checked: false }
  });

  choices.unshift(new inquirer.Separator('--- TODOs ---'));

  inquirer.prompt([
    {
      type: 'checkbox',
      message: 'What have you done today',
      name: 'todos',
      pageSize: 20,
      choices
    }
  ]).then( ({todos}) => {
    // go through all the choices and toggle the state of those in answers.todos;
    let newList = allTodo.reduce( (all, todo) => {
      let toggle = todos.find(answer => {
        let ratio = (todo.indexOf(answer.trim())+answer.trim().length) / todo.length;
        return ratio > 0.75 && ratio < 1.1;
      });
      all[todo] = toggle ? todo.match(/(\[x])/g) ? todo : todo.replace(/(\[\s])/g, '[x]') : todo.replace(/(\[x])/g, '[ ]');
      return all;
    }, {});
    return toggleTodos(newList);
  });
}

module.exports = list;