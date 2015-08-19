var articles = require('../../app/controllers/articles.server.controller'),
    mongoose = require('mongoose'),
    Message = mongoose.model('Message'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article');


var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                return err.errors[errName].message;
            }

        }
    } else {
        return 'Unknown server error';
    }
};


exports.create = function(req, res) {

    Article.findById(req.body._article).exec(function(err, article) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        if (!article) {
            return res.status(400).send({
                message: 'Failed to load article ' + req.body._article
            });
        }

        User.findById(req.body._to).exec(function(err, user) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            }
            if (!user) {
                return res.status(400).send({
                    message: 'Failed to load receiver user ' + req.body._to
                });
            }


            var message = new Message();
            message._from = req.user;
            message._to = user;
            message.content = req.body.content;
            message._article = article;


            message.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {

                    res.send(message);

                }
            });

        });


    });
};

exports.listMyMessages = function(req, res) {
    Message.find({_to:req.user, checked: false}).sort('-created').populate('_from', 'firstName lastName fullName').populate('_article', 'title').exec(function(err, articles) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(articles);
        }
    });
};


exports.listByArticle = function(req, res) {
    Message.find({_article:req.article}).sort('-created').populate('_from', 'firstName lastName fullName').exec(function(err, articles) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(articles);
        }
    });
};


exports.update = function(req, res) {
    var message = req.message;
    message.checked = true;

    message.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(message);
        }
    });
};

exports.messageByID = function(req, res, next, id) {
    Message.findById(id).exec(function(err, message) {
        if (err) return next(err);
        if (!message) return next(new Error('Failed to load message ' +
            id));
        req.message = message;
        next();
    });
};

