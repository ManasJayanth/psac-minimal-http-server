module.exports = {
    notify: require('./notify'),
    home: {
        get: function (request, response) {
            console.log('index');
            response.json(200, {message: "OK"});
        }
    }
};
