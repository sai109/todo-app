const express = require('express');
const passport = require('passport');
const { Todo } = require('../models/todo');
const { ObjectID } = require('mongodb');
const logger = require('../../logger/logger');

const router = express.Router();

// POST /todo - Adds a new todo
router.post(
	'/todo',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		if (!req.body.todo) {
			return res
				.status(400)
				.send({ error: 'Please provide a todo to complete' });
		}

		const newTodo = new Todo({
			body: req.body.todo,
			_creator: req.user._id,
		});

		newTodo
			.save()
			.then(() => res.status(200).json({ newTodo }))
			.catch(err => logger.error(err));
	},
);

// GET /todos - Gets all todos associated with user
router.get(
	'/todos',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Todo.find({ _creator: req.user._id })
			.then(todos => {
				if (todos.length > 0) {
					return res.status(200).json({ todos });
				} else {
					res.status(200).json({ todos: [] });
				}
			})
			.catch(err => logger.error(err));
	},
);

// GET /todo/:id - Gets an individual todo
router.get(
	'/todo/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const id = req.params.id;
		const creator = req.user._id;
		if (ObjectID.isValid(id)) {
			Todo.findOne({ _id: id, _creator: creator })
				.then(todo => {
					if (todo) {
						res.status(200).json({ todo });
					} else {
						res.status(404).json({ error: 'Todos not found' });
					}
				})
				.catch(err => logger.error(err));
		} else {
			res.status(400).json({
				error: 'Please a valid id for the todo you would like to find',
			});
		}
	},
);

// PATCH /todo/:id - Edits an individual todo
router.patch(
	'/todo/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const id = req.params.id;
		const updates = {};
		const { body, completed } = req.body;

		if (body) {
			updates.body = body;
		}
		if (completed) {
			updates.completed = completed;
		}

		if (!ObjectID.isValid(id)) {
			return res.status(400).send({ error: 'Please submit a valid todo ID' });
		}

		Todo.findOneAndUpdate(
			{ _id: id, _creator: req.user._id },
			{ $set: updates },
			{ new: true },
		)
			.then(todo => {
				if (todo) {
					res.status(200).send({ todo });
				} else {
					res.status(404).send({ error: 'Todo not found' });
				}
			})
			.catch(err => logger.error(err));
	},
);

// DELETE /todo/:id - Should delete a todo
router.delete(
	'/todo/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const id = req.params.id;
		if (!ObjectID.isValid(id)) {
			return res.status(400).send({ error: 'Please submit a valid ID' });
		}
		Todo.findOneAndRemove({ _id: id, _creator: req.user._id })
			.then(todo => {
				if (!todo) {
					return res.status(404).send({ error: 'Todo not found' });
				} else {
					res.status(200).send({ todo });
				}
			})
			.catch(err => res.status(404).send(err));
	},
);
module.exports = router;
