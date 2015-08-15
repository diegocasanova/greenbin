var fs = require('fs');

module.exports = function(app){


	app.post('/api/images',function(req,res){
		console.log(req.files.file.path, req.body.articleId);
		var img = fs.readFileSync(req.files.file.path);
	    res.end(img, 'binary');
	});

};