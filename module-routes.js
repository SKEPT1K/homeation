var Homeation = require('./Homeation.js');

module.exports = function(app) {
  var hModule = require(app.modulePath + '/' + app.activeModule + '.js');

  app.get('/' + app.activeModule, function(req, res){
    hModule.renderInfo(function(err, render){
      if(err){
        res.render(err);
      } else {
        res.render(render.view, render.params);
      }
    });
  });
}
