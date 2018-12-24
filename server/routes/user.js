const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { User } = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => res.status(200));

// POST /register - registers user up to servie
router.post('/register', (req, res) => {
	if (!req.body.email) {
		return res.status(400).send({ email: 'Please provide an email' });
	}
	if (!validator.isEmail(req.body.email)) {
		return res.status(400).send({ email: 'Email invalid' });
	}
	if (!req.body.password) {
		return res.status(400).send({ password: 'Please provide an password' });
	}
	if (req.body.password.length < 6) {
		return res
			.status(400)
			.send({ password: 'Password must be at least 6 letters' });
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
							.catch(err => console.log(err));
					});
				});
			}
		})
		.catch(err => console.log(err));
});

// GET /login - logs user into service
router.get('/login', (req, res) => {
	if (!req.body.email) {
		return res.status(400).send({ email: 'Please provide an email' });
	}
	if (!validator.isEmail(req.body.email)) {
		return res.status(400).send({ email: 'Email invalid' });
	}
	if (!req.body.password) {
		return res.status(400).send({ password: 'Please provide an password' });
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
							const payload = { email: userEmail, password: userPassword };
							jwt.sign(
								payload,
								process.env.jwt_key,
								{ expiresIn: 3600 },
								(err, token) => {
									res.json({ success: true, token: `Bearer ${token}` });
								}
							);
						} else {
							return res
								.status(401)
								.send({ password: 'Your password is incorrect' });
						}
					})
					.catch(err => console.log(err));
			} else {
				return res.status(401).send({ email: 'User not found' });
			}
		})
		.catch(err => console.log(err));
});

module.exports = router;
