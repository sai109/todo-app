const validator = require('validator');

module.exports = body => {
	let errors = {};
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
		errors.password = 'Password must be at least 6 letters';
	}

	if (!body.password) {
		errors.password = 'Please provide an password';
	}

	if (!body.email) {
		errors.email = 'Please provide an email';
	}

	return errors;
};
