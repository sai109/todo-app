const { ObjectID } = require('mongodb');

const { User } = require('../../models/user');
const { Todo } = require('../../models/todo');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [
	{
		_id: userOneID,
		email: 'user1@example.com',
		password: '123456'
	},
	{
		_id: userTwoID,
		email: 'user2@example.com',
		password: 'L@k$eyhthtbgzx'
	}
];

const todoOneID = new ObjectID();
const todoTwoID = new ObjectID();
const todoThreeID = new ObjectID();

const todos = [
	{
		_id: todoOneID,
		body: 'Test 101',
		completed: false,
		_creator: userOneID
	},
	{
		_id: todoTwoID,
		body: 'Test 102',
		completed: false,
		_creator: userOneID
	},
	{
		_id: todoThreeID,
		body: 'Test 103',
		completed: false,
		_creator: userOneID
	}
];

const populateUsers = done => {
	User.remove({})
		.then(() => User.insertMany(users))
		.then(() => done());
};

const populateTodos = done => {
	Todo.remove({})
		.then(() => Todo.insertMany(todos))
		.then(() => done());
};

module.exports = {
	users,
	populateUsers,
	todos,
	populateTodos,
	userOneID,
	todoOneID
};
