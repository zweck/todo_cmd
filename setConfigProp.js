const setConfigProp = function(object){
  let config = require(configPath);
  config = Object.assign({}, config, object);
}