const express = require('express');
const passport = require('passport');
const { Todo } = require('../models/todo');

const router = express.Router();

// GET /todos - Gets all todos associated with user
router.get(
	'/todos',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Todo.find({ _creator: req.user._id })
			.then(users => {
				if (users) {
					return res.status(200).json(users);
				} else {
					res
						.status(404)
						// eslint-disable-next-line quotes
						.json({ error: "Your user doesn't seem to have any todos" });
				}
			})
			.catch(err => console.log(err));
	}
);

module.exports = router;
