const config = require('config');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
	},
	hash: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
	},
	role: {
		type: String,
		enum: config.get('roles.possible'),
		default: config.get('roles.default'),
	},
});

UserSchema.methods.compareHash = async function (proposed) {
	return proposed === this.hash;
};

module.exports = mongoose.model('User', UserSchema);