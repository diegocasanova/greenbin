var User = require('mongoose').model('User');

exports.delete = function(req, res, next){
	req.user.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.user);
		}
	});
}

exports.read = function(req, res, next){
	res.json(req.user);
}

exports.update = function(req, res, next){
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
		if (err){
			return next(err);
		}else{
			res.json(user);
		}
	});
};

exports.userById = function(req, res, next, id){
	User.findOne({
		_id : id
	}, function(err, user){
		if (err){
			return next(user);
		}else{
			req.user = user;
			next();
		}
	});
};

exports.create = function(req, res, next){

	var user = new User(req.body);

	user.save(function(err){
		if (err){
			return next(err);
		}else{
			res.json(user);
		}
	});

};


exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};