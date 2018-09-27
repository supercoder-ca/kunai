const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const crypto = require('crypto');
const MongoStore = require('connect-mongo')(session);
//const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const worker = require('worker_threads');

mongoose.Promise = config.get('app.promises');
mongoose.connect(config.get('db.uri'), config.get('db.options'));
let sessionStore = new MongoStore({
	mongooseConnection: mongoose.connection,
	ttl: config.get('security.session.ttl'),
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(session({
	secret: config.get('security.session.secret'),
	resave: config.get('security.session.resave'),
	saveUninitialized: config.get('security.session.saveUninitialized'),
	store: sessionStore,
	unset: config.get('security.session.unset'),
	cookie: config.get('security.session.cookie'),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(async (req, res, next) => {
	Object.setPrototypeOf(req, app.request)
	Object.setPrototypeOf(res, app.response)
	req.res = res;
	res.req = req;
	if (! req.session) return next();
	req.session.asave = async () => {
    	return new Promise((go, stop) => {
    		req.session.save((e) => {
    			if (e) return stop(e);
    			return go();
    		});
    	});
	};
	await req.session.asave().catch((e) => {
    	console.error('SESSION SAVE ERROR', e);
	});
	return next();
});

const User = require('./models/user');
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	User.findById(id, (e, user) => {
		done(e, user);
	});
});
passport.use(new LocalStrategy(async (username, hash, done) => {
	let user = await User.findOne({ username });
	if (! user) return done(null, false, { message: 'no user' });
	if (! await user.compareHash(hash)) return done(null, false, { message: 'failed pass' });
	done(null, user);
}));

app.use('/auth', require('./routers/auth'));

module.exports = {
	path: config.get('server.path'),
	handler: app
};