#!/usr/bin/env node
const init = require('./init');
const list = require('./list');
const newTodoMonth = require('./newTodoMonth');
const newTodo = require('./newTodo');

const argv = require('yargs')
  .command('init', '[options] -dir | -d, initialize a new todo workbook', (yargs) => {
    return yargs.option('dir', {
      alias: 'd',
      default: './'
    })
  }, init)
  .command('list', `list all the todo's`, () => {}, list)
  .command('new-day', `create a new .md for today`, () => {}, newTodoMonth)
  .command('add', `[options] -item | -i, create a new todo in today's file`, (yargs) => {
    return yargs.option('item', {
      alias: 'i',
      default: 'foo'
    })
  }, newTodo)
  .demandCommand()
  .help()
  .argv;