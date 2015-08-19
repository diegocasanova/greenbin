var articles = require('../../app/controllers/articles.server.controller'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    Image = mongoose.model('Image'),
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

    Article.findById(req.body.articleId).exec(function(err, article) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        if (!article) {
            return res.status(400).send({
                message: 'Failed to load article ' + id
            });
        }

        var image = new Image();
        image.data = fs.readFileSync(req.files.file.path);
        image._article = article._id;
        image.contentType = req.files.file.mimetype;


        image.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {

                res.send({
                    imageId: image._id
                });

            }
        });

    });


};


exports.read = function(req, res) {
    res.set('Content-Type', req.image.contentType);
    res.send(req.image.data);
};

exports.imageByID = function(req, res, next, id) {
    Image.findById(id).exec(function(err, image) {
        if (err) return next(err);
        if (!image) return next(new Error('Failed to load image ' +
            id));
        req.image = image;
        next();
    });
};



exports.delete = function(req, res) {
    var image = req.image;
    image.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).end();
        }
    });
};