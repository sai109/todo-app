const { ObjectID } = require('mongodb');

const { User } = require('../../models/user');

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

const populateUsers = done => {
	User.remove({})
		.then(() => User.insertMany(users))
		.then(() => done());
};

module.exports = { users, populateUsers };
