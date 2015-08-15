var images = require('../../app/controllers/images.server.controller'),
users = require('../../app/controllers/users.server.controller');

module.exports = function(app){


	app.route('/api/images')
        .post(users.requiresLogin, images.create);

};