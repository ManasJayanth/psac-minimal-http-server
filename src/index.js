import http from 'http';
import nodeAsync from 'async';
import controllers from './controllers';
import middlewares from './middlewares';

const routeMaps = {
    '/notify/breaking-news': controllers.notify.breakingNews,
    '/': controllers.home
};

http.createServer(function (request, response) {
    nodeAsync.eachSeries(Object.keys(middlewares), function iterator(middleware, callback) {
        middlewares[middleware](request, response, callback);
    }, function done() {
        routeMaps[request.url][request.method.toLowerCase()](request, response);
    });
}).listen(process.env.PORT);

console.log('Server running at http://127.0.0.1:' + process.env.PORT + '/');
