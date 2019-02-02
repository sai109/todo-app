const expect = require('expect');
const { app } = require('../../server');
const request = require('supertest');
const { User } = require('../../models/user');
const {
	users,
	todos,
	populateUsers,
	populateTodos,
	todoOneID
} = require('../seeds/seeds');
const { Todo } = require('../../models/todo');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

beforeEach(populateUsers);
beforeEach(populateTodos);

afterEach(done => {
	Todo.remove({}).then(() => done());
});

afterEach(done => {
	User.remove({}).then(() => done());
});

describe('GET /todos', () => {
	it('should return 401 if user not logged in', done => {
		request(app)
			.get('/api/todos')
			.expect(401)
			.end(done);
	});

	it('should return todos if user logged in', done => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600
		});
		request(app)
			.get('/api/todos')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect(res => {
				expect(res.body.todos.length).toBe(3);
			})
			.end(done);
	});

	it('should return 404 if no todos are found', done => {
		const payload = { email: users[1].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600
		});
		request(app)
			.get('/api/todos')
			.set('Authorization', `Bearer ${token}`)
			.expect(404)
			.end(done);
	});
});

describe('GET /todo/:id', () => {
	it('should return 401 if user not logged in', done => {
		request(app)
			.get('/api/todo/1234')
			.expect(401)
			.end(done);
	});

	it('should return 400 if todo id invalid', done => {
		const payload = { email: users[1].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600
		});
		request(app)
			.get('/api/todo/1234')
			.set('Authorization', `Bearer ${token}`)
			.expect(400)
			.end(done);
	});

	it('should return 404 if todo not found', done => {
		const payload = { email: users[1].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600
		});
		id = new ObjectID();
		request(app)
			.get(`/api/todo/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(404)
			.end(done);
	});

	it('should return todo if logged in an correct id', done => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600
		});
		const id = todoOneID.toHexString();
		request(app)
			.get(`/api/todo/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(res => {
				expect(res.body.todo.body).toBe(todos[0].body);
				expect(res.body.todo.completed).toBeFalsy();
				expect(res.body.todo._id).toBe(id);
				expect(res.body.todo._creator).toBe(todos[0]._creator.toHexString());
			})
			.expect(200)
			.end(done);
	});

	it('should deny access if user trys to access some one elses todo', done => {
		const payload = { email: users[1].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600
		});
		const id = todoOneID.toHexString();
		request(app)
			.get(`/api/todo/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todo/:id', () => {
	it('should return 401 if user not logged on', done => {
		request(app)
			.patch('/api/todo/123abc')
			.expect(401)
			.end(done);
	});

	it('should return 400 if invalid object id', done => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600
		});

		request(app)
			.patch('/api/todo/123abc')
			.set('authorization', `Bearer ${token}`)
			.expect(400)
			.end(done);
	});

	it('should send 404 if todo not found', done => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600
		});
		const id = new ObjectID().toHexString();

		request(app)
			.patch(`/api/todo/${id}`)
			.expect(404)
			.set('authorization', `Bearer ${token}`)
			.expect(404)
			.end(done);
	});

	it('should edit todo body', done => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600
		});
		const id = todos[0]._id.toHexString();
		const text = 'Test update';

		request(app)
			.patch(`/api/todo/${id}`)
			.set('authorization', `Bearer ${token}`)
			.send({
				body: text
			})
			.expect(200)
			.expect(res => {
				expect(res.body.todo.body).toBe(text);
				expect(res.body.completed).toBeFalsy();
			})
			.end(done);
	});

	it('should edit todo completed', done => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600
		});
		const id = todos[0]._id.toHexString();
		const completed = true;

		request(app)
			.patch(`/api/todo/${id}`)
			.set('authorization', `Bearer ${token}`)
			.send({
				completed
			})
			.expect(200)
			.expect(res => {
				expect(res.body.todo.completed).toBeTruthy();
				expect(res.body.todo.body).toBe(todos[0].body);
			})
			.end(done);
	});

	it('should not edit todo if no edits passed', done => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600
		});
		const id = todos[0]._id.toHexString();
		request(app)
			.patch(`/api/todo/${id}`)
			.set('authorization', `Bearer ${token}`)
			.expect(200)
			.expect(res => {
				expect(res.body.todo.completed).toBe(todos[0].completed);
				expect(res.body.todo.body).toBe(todos[0].body);
			})
			.end(done);
	});
});
