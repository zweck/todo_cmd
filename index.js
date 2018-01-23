#!/usr/bin/env node
const tilde = require('tilde-expansion');
const chalk = require('chalk');
const init = require('./lib/init');
const list = require('./lib/list');
const newTodoMonth = require('./lib/newTodoMonth');
const newTodo = require('./lib/newTodo');
const setConfigProp = require('./lib/setConfigProp');
const config = require('./lib/loadConfig');

const argv = require('yargs')
  .command('init', 'initialize a new todo workbook', {
    'dir': {
      alias: 'd',
      default: '~'
    },
    'with-git': {
      default: false
    },
    'template': {
      default: 'year_month_day'
    },
  }, init)
  .command('add', `add todo in today's file`, {}, newTodo)
  .command('list', `list all the todo's`, {}, list)
  .option('raw',{
     alias: 'r',
     default: false
   })
  .option('filter',{
     alias: 'f'
   })
  .command('get-folder', `get the folder for your todos`, {}, () => {
    console.log(chalk.blue(config.todoRoot));
  })
  .command('set-folder', `set the folder for your todos`, (yargs) => {
    return yargs.option('dir', {
      alias: 'd'
    })
  }, (args) => {
    dir = args.dir || args._[1];
    tilde(dir, expandedDir => {
      setConfigProp({ todoRoot: expandedDir });
    });
  })
  .command('get-template', `get the template for your todos`, {}, () => {
    console.log(chalk.blue(config.template));
  })
  .command('set-template', `set the template for your todos using year, month and day`, {}, (args) => {
    setConfigProp({ template: args._[1] });
  })
  .command('new-day', `create a new .md for today`, {}, newTodoMonth)
  .group('dir', 'set-folder:')
  .group(['raw', 'filter'], 'list')
  .group(['dir', 'with-git'], 'init:')
  .describe('filter', 'filter the todo list')
  .describe('dir', '-d, directory')
  .describe('item', '-i, the string for your todo')
  .describe('with-git', 'init the todo with git')
  .describe('template', 'set the folder and file name format')
  .demandCommand()
  .help()
  .argv;
