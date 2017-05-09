#!/usr/bin/env node
const init = require('./init');
const argv = require('yargs')
  .command('init', 'initialize a new todo workbook', (yargs) => {
    return yargs.option('dir', {
      alias: 'd',
      default: './'
    })
  }, init)
  .demandCommand()
  .help()
  .argv;