#!/usr/bin/env node
const tilde = require('tilde-expansion');
const chalk = require('chalk');
const init = require('./init');
const list = require('./list');
const newTodoMonth = require('./newTodoMonth');
const newTodo = require('./newTodo');
const setConfigProp = require('./setConfigProp');
const config = require('./loadConfig');

const argv = require('yargs')
  .command('init', 'initialize a new todo workbook', {
    'dir': {
      alias: 'd',
      default: '~'
    },
    'with-git': {
      default: false
    }
  }, init)
  .command('get-folder', `get the folder for your todos`, () => {}, () => {
    console.log(chalk.blue(config.todoRoot));
  })
  .command('set-folder', `set the folder for your todos`, (yargs) => {
    return yargs.option('dir', {
      alias: 'd',
      default: './'
    })
  }, ({dir}) => {
    tilde(dir, (expandedDir) => { 
      setConfigProp({ todoRoot: expandedDir });
    });
  })
  .command('list', `list all the todo's`, (yargs) => {
  	return yargs.option('raw',{
  	  alias: 'r',
  	  default: false 		
  	})
  }, list)
  .command('new-day', `create a new .md for today`, () => {}, newTodoMonth)
  .command('add', `create a new todo in today's file`, (yargs) => {
    return yargs.option('item', {
      alias: 'i'
    })
  }, newTodo)
  .group('item', 'add:')
  .group('dir', 'set-folder:')
  .group(['dir', 'with-git'], 'init:')
  .describe('dir', '-d, directory')
  .describe('item', '-i, the string for your todo')
  .describe('with-git', 'init the todo with git')
  .demandCommand()
  .help()
  .argv;