const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	}
});

module.exports = { User: mongoose.model('user', userSchema) };
