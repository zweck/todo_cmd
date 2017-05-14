#!/usr/bin/env node
const tilde = require('tilde-expansion');
const chalk = require('chalk');
const init = require('./init');
const list = require('./list');
const newTodoMonth = require('./newTodoMonth');
const newTodo = require('./newTodo');
const setConfigProp = require('./setConfigProp');
const config = require('./config');

const argv = require('yargs')
  .command('init', '[options] -dir | -d, initialize a new todo workbook', (yargs) => {
    return yargs.option('dir', {
      alias: 'd',
      default: './'
    })
  }, init)
  .command('get-folder', `get the folder for your todos`, () => {}, () => {
    console.log(chalk.blue(config.todoRoot));
  })
  .command('set-folder', `[options] -dir | -d, set the folder for your todos`, (yargs) => {
    return yargs.option('dir', {
      alias: 'd',
      default: './'
    })
  }, ({dir}) => {
    tilde(dir, (expandedDir) => { 
      setConfigProp({ todoRoot: expandedDir });
    });
  })
  .command('list', `list all the todo's`, () => {}, list)
  .command('new-day', `create a new .md for today`, () => {}, newTodoMonth)
  .command('add', `[options] -item | -i, create a new todo in today's file`, (yargs) => {
    return yargs.option('item', {
      alias: 'i'
    })
  }, newTodo)
  .demandCommand()
  .help()
  .argv;