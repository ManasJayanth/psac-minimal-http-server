export default function (request, response, next) {
    response.json = function(code, json) {
        this.writeHead(code, {'Content-Type': 'application/json'});
        this.end(JSON.stringify(json));
    };
    next();
}
