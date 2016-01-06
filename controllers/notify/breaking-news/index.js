module.exports = {
    post: function (request, response) {
        console.log(request.body);
        response.json(200, {message: 'OK'});
    }
};
