const config = require('./loadConfig');

const month = `0${new Date().getMonth()+1}`.slice(-2);
const year = `${new Date().getFullYear()}`;
const day = `0${new Date().getDate()+1}`.slice(-2);

const getTodoPath = function(){
  const template = config.template;
  return `${template.replace(/year/g, year).replace(/month/g, month).replace(/day/g, day)}.md`;
}

const today = {
  year, month, day
}

module.exports = { getTodoPath, today };