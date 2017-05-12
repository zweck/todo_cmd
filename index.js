#!/usr/bin/env node
const init = require('./init');
const listDone = require('./listDoneNotDone').listDone;
const listNotDone = require('./listDoneNotDone').listNotDone;
const newTodoMonth = require('./newTodoMonth');

const argv = require('yargs')
  .command('init', 'initialize a new todo workbook', (yargs) => {
    return yargs.option('dir', {
      alias: 'd',
      default: './'
    })
  }, init)
  .command('list-done', `list all the done todo's`, () => {}, listDone)
  .command('list-not-done', `list all the not done todo's`, () => {}, listNotDone)
  .command('new-day', `create a new .md for today`, () => {}, newTodoMonth)
  .demandCommand()
  .help()
  .argv;