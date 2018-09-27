const defer = require('config/defer').deferConfig;
module.exports = {
	app: {
		promises: global.Promise,
	},
	server: {
		path: '/api',
		host: process.env.NODE_HOST || '127.0.0.1',
		port: process.env.NODE_PORT || 3000,
		secure: false,
	},
	frontend: {
		title: 'kunai',
		description: 'encrypted email service',
	},
	db: {
		uri: 'mongodb://127.0.0.1:27017/kunai',
		options: {
			reconnectTries: Number.MAX_VALUE,
			autoIndex: false,
			useNewUrlParser: true,
		},
	},
	security: {
		session: {
			resave: true,
			saveUninitialized: true,
			keylen: 32,
			ttl: 24 * 60 * 60 * 1000,  //  1 day
			unset: 'destroy',
			secret: defer(function () { return require('crypto').randomBytes(this.security.session.keylen).toString('hex') }),
			cookie: {
				secure: false,
				httpOnly: false,
				maxAge: defer(function () { return this.security.session.ttl }),
			},
		},
	},
	roles: {
		default: 'regular',
		possible: [ 'premium', 'moderator', 'support', 'admin' ].push(defer(function () { return this.roles.default; })),
	},
	client: {
		precision: {
			'USD': 4,
			'EUR': 4,
			'BTC': 8,
			'ETH': 8,
		},
	},
	pluggable: {
		axios: {},
	},
};