var fs     = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));


/*
 * @PARAMS callback()
 * Scan the 'modules' folder to determine what modules are availaible.
 */
exports.getInstalledModules = function(callback){
  var installed_modules = [];
  fs.readdirSync('modules/').filter(function(file) {
    if(fs.statSync('modules/' + file).isDirectory()){
      installed_modules.push(file);
    }
  });
  callback(null, installed_modules);
}

/*
 * @PARAMS <string> module_name, callback()
 * Checks to see if the module is installed.
 */
exports.isModuleInstalled = function(module_name, callback){
  exports.getInstalledModules(function(err, installed_modules){
    if(err){
      callback("There was an error getting installed modules.", null);
    } else {
      if(installed_modules.indexOf(module_name) !== -1){
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  });
}

/*
 * @PARAMS <string> module_name, callback()
 * Activates the module selected in /setup.  Records the change in config.json
 */
exports.activateModule = function(module_name, callback){
  exports.isModuleInstalled(module_name, function(err, installed){
    if(err){
      callback(err);
    } else {
      if(installed === true){
        config.homeation.active_module = module_name;
        fs.writeFileSync('config.json', JSON.stringify(config));
        callback(null);
      } else {
        callback(module_name + " is not currently installed.")
      }
    }
  });
}
