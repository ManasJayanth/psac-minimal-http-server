var test = require('tape');
var http = require('http');
var MinHttpServer = require('../lib');

__DEV__ = true;

test('constructor', function (t) {
  var minHttpServer = new MinHttpServer(),
      keys = [
        '_server',
        '_middlewares',
        '_routeMaps',
        '_inactive'
      ];
  t.equal(Object.keys(minHttpServer).length, keys.length,
          'instance must have ' + keys.length + ' keys');
  keys.forEach(function (key) {
  t.ok(key in minHttpServer,
       'instance must have property ' + key);
  });
  t.end();
});

test('.listen should start a server', function (t) {
  var minHttpServer = new MinHttpServer();
  minHttpServer.listen(3333, function () {
    t.notOk(minHttpServer._inactive,
            'instance._inactive must be false after the server has been started to listen');
  });
  t.ok(minHttpServer._server instanceof http.Server,
       'instance must have `_server` of type http.Server');
  minHttpServer.close();
  t.end();
});

test('.use should add a middleware to the middleware stack (_middlewares)',
function (t) {
  var minHttpServer = new MinHttpServer(),
      mockMiddleware = function (req, res, next) {
        req.testProperty = 'testValue';
      };
  minHttpServer.use(mockMiddleware);
  t.equal(minHttpServer._middlewares.length, 1,
       'instance must have only one middleware');
  t.end();
});

test('.close should close a server', function (t) {
  var minHttpServer = new MinHttpServer();
  minHttpServer.listen(3333);
  minHttpServer.close();
  t.ok(minHttpServer._inactive,
       'instance._inactive must be true after the server has been closed');
  t.end();
});
