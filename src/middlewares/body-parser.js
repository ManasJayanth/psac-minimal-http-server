import qs from 'querystring';

export default function (request, response, next) {
    let bodyString = '', parser;
    if (request.method === 'POST') {
        request.on('data', function (chunk) {
            bodyString += chunk;
        });
        request.on('end', function () {
            let contentType = request.headers['content-type'];
            if (contentType === 'application/json') {
                parser = JSON;
            } else {
                parser = qs;
            }
            request.body = parser.parse(bodyString);
            next();
        });
    } else {
        next();
    }
}
