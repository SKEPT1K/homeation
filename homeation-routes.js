var Homeation = require('./Homeation.js');

module.exports = function(app) {
  app.get('/', function(req, res){
    res.send("If you're seeing this page, homeation has been properly setup!");
  });

  app.get('/setup', function(req, res){
    Homeation.getInstalledModules(function(err, installed_modules){
      res.render('setup',{'installed_modules': installed_modules});
    });
  });

  app.post('/homeation/module/activate/:module_name', function(req, res){
    var module_name = encodeURIComponent(req.params.module_name);
    Homeation.activateModule(module_name, function(err){
      if(err){
        res.json({'error': err});
      } else {
        res.json({'success' :"module activated."});
      }
    });
  });
}
