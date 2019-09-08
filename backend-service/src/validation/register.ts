import * as validator from 'validator';

interface Ierrors {
	email?: string;
	password?: string;
}

module.exports = body => {
	let errors: Ierrors = {};
	if (!validator.isEmail(body.email)) {
		errors.email = 'Email invalid';
	}

	if (!body.password.match(/.*[!@#$%^&*(),.?":{}|<>].*/)) {
		errors.password =
			'Your password must contain atleast one special character';
	}

	if (!body.password.match(/.*[0-9].*/)) {
		errors.password = 'Your password must contain a number';
	}

	if (!body.password.match(/.*[A-Z].*/)) {
		errors.password =
			'Your password must contain at least one uppercase letter';
	}

	if (!body.password.match(/.*[a-z].*/)) {
		errors.password =
			'Your password must contain at least one lowercase letter';
	}

	if (body.password.length < 9) {
		errors.password = 'Password must be at least 9 letters';
	}

	if (!body.password) {
		errors.password = 'Please provide an password';
	}

	if (!body.email) {
		errors.email = 'Please provide an email';
	}

	return errors;
};
