const config = require('config');
const passport = require('passport');
const User = require('../models/user');
const r = require('express').Router();

r.post('/login', passport.authenticate('local'), async (req, res) => {
	req.user.hash = undefined;
	delete req.user.hash;
	req.session.user = req.user;
	return res.json({
		ok: true,
		user: req.user,
	});
});
r.post('/signup', async (req, res) => {
	let user = new User({
		username: req.body.username,
		email: req.body.email,
		hash: req.body.password,
	});
	await user.save().catch((e) => {
		if (e) return res.json({ ok: false, message: 'already exists', e });
	});
	req.login(user, (e) => {
		if (e) return res.json({ ok: false, e });
		user.hash = undefined;
		delete user.hash;
		req.session.user = user;
		return res.json({ ok: true, user });
	});
});
r.post('/logout', async (req, res) => {
	if (req.session && req.session.user) delete req.session.user;
	req.logout();
	return res.json({ ok: true });
});
r.get('/user', async (req, res) => {
	console.log(req.user);
	req.user.hash = undefined;
	delete req.user.hash;
	return res.json({ ok: true, user: req.user });
});

module.exports = r;