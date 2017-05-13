#!/usr/bin/env node
const init = require('./init');
const list = require('./list');
const newTodoMonth = require('./newTodoMonth');

const argv = require('yargs')
  .command('init', 'initialize a new todo workbook', (yargs) => {
    return yargs.option('dir', {
      alias: 'd',
      default: './'
    })
  }, init)
  .command('list', `list all the todo's`, () => {}, list)
  .command('new-day', `create a new .md for today`, () => {}, newTodoMonth)
  .demandCommand()
  .help()
  .argv;