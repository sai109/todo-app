const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const _ = require('lodash');
const { User } = require('../models/user');
const logger = require('../../logger/logger');

const router = express.Router();

router.get('/', (req, res) => res.status(200));

// POST /register - registers user up to service
router.post('/register', (req, res) => {
	req.body.email = req.body.email ? req.body.email : '';
	req.body.password = req.body.password ? req.body.password : '';

	let errors = {};
	if (!validator.isEmail(req.body.email)) {
		errors.email = 'Email invalid';
	}

	if (req.body.password.length < 6) {
		errors.password = 'Password must be at least 6 letters';
	}

	if (!req.body.password) {
		errors.password = 'Please provide an password';
	}

	if (!req.body.email) {
		errors.email = 'Please provide an email';
	}

	if (!_.isEmpty(errors)) {
		return res.status(400).send(errors);
	}

	User.findOne({ email: req.body.email })
		.then(user => {
			if (user) {
				return res.status(400).send({ email: 'That email already exists' });
			} else {
				const newUser = new User({
					email: req.body.email,
					password: req.body.password
				});
				bcrypt.genSalt(10, (err, salt) => {
					if (err) throw err;
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser
							.save()
							.then(user => res.status(200).json(user))
							.catch(err => logger.error(err));
					});
				});
			}
		})
		.catch(err => logger.error(err));
});

// GET /login - logs user into service
router.post('/login', (req, res) => {
	req.body.email = req.body.email ? req.body.email : '';
	req.body.password = req.body.password ? req.body.password : '';
	let errors = {};

	if (!validator.isEmail(req.body.email)) {
		errors.email = 'Email invalid';
	}
	if (!req.body.email) {
		errors.email = 'Please provide an email';
	}
	if (!req.body.password) {
		errors.password = 'Please provide an password';
	}

	if (!_.isEmpty(errors)) {
		return res.status(400).send(errors);
	}

	const userEmail = req.body.email;
	const userPassword = req.body.password;

	User.findOne({ email: userEmail })
		.then(user => {
			if (user) {
				bcrypt
					.compare(userPassword, user.password)
					.then(isMatch => {
						if (isMatch) {
							// generate token
							const payload = { email: userEmail, id: user._id };
							jwt.sign(
								payload,
								process.env.jwt_key,
								{ expiresIn: 3600 },
								(err, token) => {
									res.json({
										success: true,
										token: `Bearer ${token}`,
										id: user._id
									});
								}
							);
						} else {
							return res
								.status(401)
								.send({ password: 'Your password is incorrect' });
						}
					})
					.catch(err => logger.log(err));
			} else {
				return res.status(400).send({ user: 'User not found' });
			}
		})
		.catch(err => logger.log(err));
});

module.exports = router;
