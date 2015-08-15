var config = require('./config'),
express = require('express'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
session = require('express-session'),
flash = require('connect-flash'),
multer  = require('multer'),
passport = require('passport'),
autoReap  = require('multer-autoreap'),
paginate = require('express-paginate');



module.exports = function(){

	var app = express();


	if ( process.env.NODE_ENV === 'development' ){
		app.use(morgan('dev'));
	}else if ( process.env.NODE_ENV === 'production' ){
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));


	app.set('views','./app/views');
	app.set('view engine','ejs');

	app.use(flash());

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(multer({ dest: '/tmp/',
		rename: function (fieldname, filename) {
			return filename+Date.now();
		}
	}));
	app.use(autoReap);

	// keep this before all routes that will use pagination
	app.use(paginate.middleware(10, 50));

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/images.server.routes.js')(app);
	require('../app/routes/articles.server.routes.js')(app);

	app.use(express.static('./public'));

	return app;

};