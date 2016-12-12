exports.renderInfo = function(callback){
  var render = {}
  render.view = 'render.jade';
  render.params = {};
  callback(null, render);
}
