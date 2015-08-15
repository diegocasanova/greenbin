var articles = require('../../app/controllers/articles.server.controller'),
fs = require('fs'),
mongoose = require('mongoose'),
Image = mongoose.model('Image'),
Article = mongoose.model('Article');


var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message){
               return err.errors[errName].message;
           }

       }
   } else {
    return 'Unknown server error';
}
};


exports.create = function(req, res) {

    Article.findById(req.body.articleId).exec(function(err, article) {
        if (err){
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
            image.contentType = req.files.file.mimetype;
            image._article = article._id;

            console.log('MIME type: ' + image.contentType);

            image.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {

                    res.set('Content-Type', image.contentType);
                    res.status(200).send(image.data);

                }
            });

    });


};

/*exports.list = function(req, res) {
    Article.find().sort('-created').populate('creator', 'firstName lastName fullName ').exec(function(err, articles) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(articles);
        }
    });
};*/



exports.delete = function(req, res) {
    var article = req.article;
    article.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};







