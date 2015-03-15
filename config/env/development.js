module.exports = {
	db: 'mongodb://localhost/mean-book',
	sessionSecret: 'develpmentSessionSecret',
	facebook: {
		clientID: '930299733679341',
		clientSecret: '68eafa0249826ba0518f6024e972f6a5',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	twitter: {
	clientID: 'lojO2gnPXBiB5lWohDMdpHEai',
	clientSecret: 'BZOr8JAUXeN4QaY3mNIXVwotMcqRgNWkOdy6OjLbsNzYeAdcHc',
	callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: {
	clientID: '787881607518-u075ga1de45n1jel71tsfgsjd3u74vtk.apps.googleusercontent.com',
	clientSecret: 'qUZ4h_jML93PvPLSzaddURvY',
	callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};