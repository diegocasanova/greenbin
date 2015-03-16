var fs = require('fs');

module.exports = function(app){


	app.post('/api/photo',function(req,res){
		console.log(req.files['userPhoto'].path);
		var img = fs.readFileSync(req.files['userPhoto'].path);
	    res.end(img, 'binary');
	});

};