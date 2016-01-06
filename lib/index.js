var http = require('http'),
    qs = require('querystring'),
    nodeAsync = require('async'),
    minHttpServer;

function MinHttpServer () {
  this._server = null;
  this._middlewares = [];
  this._routeMaps = null;
  this._inactive = true;
};

MinHttpServer.prototype.listen = function (port, callback) {
  var self = this;
  this._server = http.createServer(function (request, response) {
    nodeAsync.eachSeries(this._middlewares, function iterator(middleware, callback) {
      middleware(request, response, callback);
    }, function done() {
      self._routeMaps[request.url][request.method.toLowerCase()](request, response);
    });
  })
  .listen(port, function () {
    self._inactive = false;
    callback();
  });
};

MinHttpServer.prototype.use = function (middleware) {
  this._middlewares.push(middleware);
};

MinHttpServer.prototype.close = function () {
  var self = this;
  this._server.close(function () {
    self._inactive = true;
  });
};

module.exports = MinHttpServer;
