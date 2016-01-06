var http = require('http');
var qs = require('querystring');
var nodeAsync = require('async');
var controllers = require('./controllers');
var routeMaps = {
    '/notify/breaking-news': controllers.notify.breakingNews
};

var middlewares = [
    function (request, response, next) {
        response.json = function (code, json) {
            this.writeHead(code, {'Content-Type': 'application/json'});
            this.end(JSON.stringify(json));
        };
        next();
    },
    function (request, response, next) {
        var bodyString = '', parser;
        if (request.method === 'POST') {
            request.on('data', function (chunk) {
                bodyString += chunk;
            });
            request.on('end', function () {
                var contentType = request.headers['content-type'];
                if (contentType === 'application/json') {
                    parser = JSON;
                } else {
                    parser = qs;
                }
                request.body = qs.parse(bodyString);
                next();
            });
        }
    }
];

http.createServer(function (request, response) {

    nodeAsync.eachSeries(middlewares, function iterator(middleware, callback) {
        middleware(request, response, callback);
    }, function done() {
        routeMaps[request.url][request.method.toLowerCase()](request, response);
    });

}).listen(process.env.PORT);

console.log('Server running at http://127.0.0.1:8124/');
