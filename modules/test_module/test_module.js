exports.renderPage = function(page, callback){
  var render = {}
  render.view = 'page';
  render.params = {};
  callback(null, render);
}
