var express   = require('express');
var fs        = require('fs');
var app       = express();
var Homeation = require('./Homeation.js');
app.set('view engine', 'jade');
app.use(express.static('public'));

var config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

// Establish aliases for config overriding
var listenPort   = config.homeation.listen_port;
var activeModule = config.homeation.active_module;

require('./homeation-routes.js')(app);

var server = app.listen(listenPort, function() {
  console.log("Listening on port %d", listenPort);
  Homeation.isModuleInstalled(activeModule, function(err, installed){
    if(installed === true){
      console.log(activeModule + " loaded!");

      app.activeModule = activeModule;
      app.modulePath = __dirname + "/modules/" + activeModule;
      app.set('views', app.modulePath + '/views/');
      require('./homeation-routes.js')(app);
      require('./module-routes.js')(app);
      
    } else {
      console.log("No active module detected.");
      console.log("Navigate to: <device_ip>:" + listenPort + "/setup");
    }
  });
});
