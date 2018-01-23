const fs = require('fs');
const path = require('path');
const config = require('./loadConfig');
const glob = require('glob');
const chalk = require('chalk');
const shell = require('shelljs');
const inquirer = require('inquirer');
const stringSimilarity = require('string-similarity');
const getAllTodosFromFileArray = require('./getAllTodosFromFileArray');
const getAllTodoFiles = require('./getAllTodoFiles');
const { done, notDone } = require('./matchDoneNotDone');

const toggleTodos = function(newList){
  let files = glob.sync( `${config.todoRoot}/**/*.md` );
  files.forEach( file => {
    let todo = fs.readFileSync(file, 'utf8');
    todo = todo.split(/\r?\n/);
    todo = todo.map( todoLine => {
      let replaceWithLine = Object.keys(newList).find( toReplace => (todoLine.indexOf(toReplace) > -1 && newList[toReplace] !== toReplace) );
      if (replaceWithLine) return todoLine.match(done) ? todoLine.replace(done, '[ ]') : todoLine.replace(notDone, '[x]');
      return todoLine;
    });
    fs.writeFileSync(file, todo.join('\r\n'));
    if (config.withGit) {
      shell.cd(config.todoRoot);
      shell.exec(`git add ${file}`);
    }
  });
  if (config.withGit) {
    shell.cd(config.todoRoot);
    shell.exec(`git commit -m "Updated todos"`);
  }
}

const list = function({ raw, filter }){
  let allTodo = getAllTodosFromFileArray( getAllTodoFiles() );
  if(raw) return console.log(allTodo.join('\r\n'));

  if(filter) allTodo = stringSimilarity
    .findBestMatch(filter, allTodo)
    .ratings.filter(choice => choice.rating > 0.1)
    .map(choice => choice.target);

  let choices = allTodo.map( choice => {
    if(choice.match(done)) return { name: choice.replace(done, ''), checked: true }
    return { name: choice.replace(notDone, ''), checked: false }
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
      let bestMatchValue = stringSimilarity.findBestMatch(todo, todos).bestMatch;
      let toggle = bestMatchValue.rating > 0.8;
      all[todo] = toggle ? todo.match(done) ? todo : todo.replace(notDone, '[x]') : todo.replace(done, '[ ]');
      return all;
    }, {});
    return toggleTodos(newList);
  });
}

module.exports = list;
