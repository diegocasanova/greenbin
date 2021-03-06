var users = require('../../app/controllers/users.server.controller'),
    messages = require('../../app/controllers/messages.server.controller'),
    articles = require('../../app/controllers/articles.server.controller'),
    mongoosePaginate = require('mongoose-paginate');

module.exports = function(app) {

    app.route('/api/messages')
        .get(users.requiresLogin, messages.listMyMessages)
        .post(users.requiresLogin, messages.create);

    app.route('/api/:articleId/messages/')
        .get(messages.listByArticle);
    app.param('articleId', articles.articleByID);


    app.route('/api/messages/:messageId')
        .put(users.requiresLogin, messages.update);
    app.param('messageId', messages.messageByID);

};