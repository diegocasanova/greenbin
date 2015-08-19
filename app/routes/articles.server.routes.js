var users = require('../../app/controllers/users.server.controller'),
    articles = require('../../app/controllers/articles.server.controller'),
    mongoosePaginate = require('mongoose-paginate');

module.exports = function(app) {

    app.route('/api/:userId/articles')
        .get(articles.listbyUserPaginated);

    app.route('/api/articles/search')
        .get(articles.searchPaginated);

    app.route('/api/articles/latest')
        .get(articles.listLatest);

    app.route('/api/articles')
        .get(articles.listPaginated)
        .post(users.requiresLogin, articles.create);
    app.route('/api/articles/:articleId')
        .get(articles.read)
        .put(users.requiresLogin, articles.hasAuthorization,
            articles.update)
        .delete(users.requiresLogin, articles.hasAuthorization,
            articles.delete);
    app.param('articleId', articles.articleByID);


    app.route('/api/tags')
        .get(articles.listTags);

    app.route('/api/conditions')
        .get(articles.listConditions);

};