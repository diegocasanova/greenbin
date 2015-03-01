var User = require('mongoose').model('User'),
passport = require('passport');


var getErrorMessage = function(err){
	var message = '';

	if ( err.code ){
		switch (err.code){
			case 11000:
			case 11001:
			message = 'Username already exists';
			break;default:
			message = 'Something went wrong';
		}
	}else{
		for (var errName in err.errors) {
			if (err.errors[errName].message) message =
				err.errors[errName].message;
		}
	}

	return message;

};


exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render('signin', {
			title: 'Sign-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
};

exports.renderSignup = function(req, res, next) {
	if (!req.user) {res.render('signup', {
		title: 'Sign-up Form',
		messages: req.flash('error')
	});
	} else {
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/signup');
			}
			req.login(user, function(err) {
				if (err) return next(err);return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.delete = function(req, res, next){
	req.user.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.user);
		}
	});
};

exports.read = function(req, res, next){
	res.json(req.user);
};

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