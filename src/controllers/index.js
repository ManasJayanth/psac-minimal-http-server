module.exports = {
    notify: require('./notify'),
    home: {
        get: function (request, response) {
            console.log('her');
            response.json(200, {message: "OK"});
        }
    }
};
