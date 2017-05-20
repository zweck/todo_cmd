const getAllTodosFromFileArray = function(todos){
  let done = todos.reduce( (doneList, todo) => {
    if(todo.match(/(\[x])(.*)/gm)) doneList = doneList.concat(todo.match(/(\[x])(.*)/gm));
    return doneList;
  }, []);

  let notDone = todos.reduce( (doneList, todo) => {
    if(todo.match(/(\[ ])(.*)/gm)) doneList = doneList.concat(todo.match(/(\[ ])(.*)/gm));
    return doneList;
  }, []);

  return notDone.concat(done);
}

module.exports = getAllTodosFromFileArray;
