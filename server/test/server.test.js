/**
 * @jest-environment node
 */
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const request = require('supertest');

const app = require('../app');
const { User } = require('../models/user');
const { Todo } = require('../models/todo');
const {
	users,
	todos,
	populateUsers,
	populateTodos,
	todoOneID,
} = require('./seeds/seeds');

beforeEach(populateUsers);
beforeEach(populateTodos);

afterEach(async () => {
	await Todo.remove({});
	await User.remove({});
});

describe('POST /register', () => {
	it('should register a new user', async () => {
		const email = 'example@gmail.com';
		const password = '1234567';
		const res = await request(app)
			.post('/api/register')
			.send({ email, password });
		expect(res.status).toBe(200);
		const user = await User.findOne({ email });
		expect(user.email).toBe(email);
		expect(user.password).not.toBe(password);
	});

	it('should send 400 if email already exists', async () => {
		const email = users[0].email;
		const password = '1234568';
		const res = await request(app)
			.post('/api/register')
			.send({ email, password });
		expect(res.status).toBe(400);
	});

	it('should send 400 if email not provided', async () => {
		const password = '12345678';
		const res = await request(app)
			.post('/api/register')
			.send({ password });
		expect(res.status).toBe(400);
	});

	it('should send 400 if email not valid', async () => {
		const password = '12345678';
		const email = 'luke123.com';
		const res = await request(app)
			.post('/api/register')
			.send({ email, password });
		expect(res.status).toBe(400);
	});

	it('should send 400 if password not provided', async () => {
		const email = 'example@gmail.com';
		const res = await request(app)
			.post('/api/register')
			.send({ email });
		expect(res.status).toBe(400);
	});

	it('should send 400 if password less than 6 characters', async () => {
		const email = 'example@gmail.com';
		const password = '1234';
		const res = await request(app)
			.post('/api/register')
			.send({ email, password });
		expect(res.statusCode).toBe(400);
	});
});

describe('POST /login', () => {
	const email = 'example@example.com';
	const password = '1234567';
	it('should send 200 if email and password are correct', async () => {
		await request(app)
			.post('/api/register')
			.send({ email, password });

		const res = await request(app)
			.post('/api/login')
			.send({ email, password });
		expect(res.status).toBe(200);
	});

	it('should send 401 if password is incorrect', async () => {
		const email = 'example@example.com';
		const password = '1234567';
		const reg = await request(app)
			.post('/api/register')
			.send({ email, password });
		expect(reg.status).toBe(200);
		const res = await request(app)
			.post('/api/login')
			.send({ email, password: '12345678' });
		expect(res.status).toBe(401);
	});

	it('should send 400 if email not provided', async () => {
		const res = await request(app)
			.post('/api/login')
			.send({ password });
		expect(res.status).toBe(400);
	});

	it('should send 400 if email not valid', async () => {
		const email = 'luke123.com';
		const res = await request(app)
			.post('/api/login')
			.send({ email, password });
		expect(res.status).toBe(400);
	});

	it('should send 400 if password not provided', async () => {
		const res = await request(app)
			.post('/api/login')
			.send({ email });
		expect(res.status).toBe(400);
	});
});

describe('POST /todo', () => {
	it('should return 401 if user not logged in ', async () => {
		const res = await request(app).post('/api/todo');
		expect(res.status).toBe(401);
	});

	it('should return 400 if todo not provided', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});

		const res = await request(app)
			.post('/api/todo')
			.set('Authorization', `Bearer ${token}`);
		expect(res.status).toBe(400);
	});

	it('should add todo', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const todoBody = 'Test 123';

		const res = await request(app)
			.post('/api/todo')
			.set('Authorization', `Bearer ${token}`)
			.send({ todo: todoBody });
		expect(res.status).toBe(200);
		const todo = await Todo.findOne({ body: todoBody });
		expect(todo.body).toBe(todoBody);
	});
});

describe('GET /todos', () => {
	it('should return 401 if user not logged in', async () => {
		const res = await request(app).get('/api/todos');
		expect(res.status).toBe(401);
	});

	it('should return todos if user logged in', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});

		const res = await request(app)
			.get('/api/todos')
			.set('Authorization', `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.todos.length).toBe(3);
	});

	it('should return 200 if no todos are found', async () => {
		const payload = { email: users[1].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const res = await request(app)
			.get('/api/todos')
			.set('Authorization', `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.todos.length).toBe(0);
	});
});

describe('GET /todo/:id', () => {
	it('should return 401 if user not logged in', async () => {
		const res = await request(app).get('/api/todo/1234');
		expect(res.status).toBe(401);
	});

	it('should return 400 if todo id invalid', async () => {
		const payload = { email: users[1].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const res = await request(app)
			.get('/api/todo/1234')
			.set('Authorization', `Bearer ${token}`);
		expect(res.status).toBe(400);
	});

	it('should return 404 if todo not found', async () => {
		const payload = { email: users[1].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const id = new ObjectID();
		const res = await request(app)
			.get(`/api/todo/${id}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.status).toBe(404);
	});

	it('should return todo if logged in an correct id', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const id = todoOneID.toHexString();
		const res = await request(app)
			.get(`/api/todo/${id}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.todo.body).toBe(todos[0].body);
		expect(res.body.todo.completed).toBeFalsy();
		expect(res.body.todo._id).toBe(id);
		expect(res.body.todo._creator).toBe(todos[0]._creator.toHexString());
	});

	it('should deny access if user trys to access some one elses todo', async () => {
		const payload = { email: users[1].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const id = todoOneID.toHexString();
		const res = await request(app)
			.get(`/api/todo/${id}`)
			.set('Authorization', `Bearer ${token}`);
		expect(res.status).toBe(404);
	});
});

describe('PATCH /todo/:id', () => {
	it('should return 401 if user not logged on', async () => {
		const res = await request(app).patch('/api/todo/123abc');
		expect(res.status).toBe(401);
	});

	it('should return 400 if invalid object id', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});

		const res = await request(app)
			.patch('/api/todo/123abc')
			.set('authorization', `Bearer ${token}`);
		expect(res.status).toBe(400);
	});

	it('should send 404 if todo not found', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const id = new ObjectID().toHexString();

		const res = await request(app)
			.patch(`/api/todo/${id}`)
			.set('authorization', `Bearer ${token}`);
		expect(res.status).toBe(404);
	});

	it('should edit todo body', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const id = todos[0]._id.toHexString();
		const text = 'Test update';

		const res = await request(app)
			.patch(`/api/todo/${id}`)
			.set('authorization', `Bearer ${token}`)
			.send({
				body: text,
			});
		expect(res.status).toBe(200);
		expect(res.body.todo.body).toBe(text);
		expect(res.body.completed).toBeFalsy();
	});

	it('should edit todo completed', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const id = todos[0]._id.toHexString();
		const completed = true;

		const res = await request(app)
			.patch(`/api/todo/${id}`)
			.set('authorization', `Bearer ${token}`)
			.send({
				completed,
			});
		expect(res.status).toBe(200);
		expect(res.body.todo.completed).toBeTruthy();
		expect(res.body.todo.body).toBe(todos[0].body);
	});

	it('should not edit todo if no edits passed', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const id = todos[0]._id.toHexString();
		const res = await request(app)
			.patch(`/api/todo/${id}`)
			.set('authorization', `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.todo.completed).toBe(todos[0].completed);
		expect(res.body.todo.body).toBe(todos[0].body);
	});
});

describe('DELETE /todo/:id', () => {
	it('should return 401 if user not logged on', async () => {
		const res = await request(app).delete('/api/todo/123abc');
		expect(res.status).toBe(401);
	});

	it('should return 400 if user ID is invalid', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const res = await request(app)
			.delete('/api/todo/123abc')
			.set('authorization', `Bearer ${token}`);
		expect(res.status).toBe(400);
	});

	it('should not raise 404 if todo not found', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const id = new ObjectID().toHexString();

		const res = await request(app)
			.delete(`/api/todo/${id}`)
			.set('authorization', `Bearer ${token}`);
		expect(res.status).toBe(404);
	});

	it('should not be able to delete another users todo', async () => {
		const payload = { email: users[1].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const id = todoOneID.toHexString();

		const res = await request(app)
			.delete(`/api/todo/${id}`)
			.set('authorization', `Bearer ${token}`);
		expect(res.status).toBe(404);
	});

	it('should delete a todo', async () => {
		const payload = { email: users[0].email };
		const token = jwt.sign(payload, process.env.jwt_key, {
			expiresIn: 3600,
		});
		const id = todoOneID.toHexString();

		const res = await request(app)
			.delete(`/api/todo/${id}`)
			.set('authorization', `Bearer ${token}`);
		expect(res.status).toBe(200);
		const todo = await Todo.findById(id);
		expect(todo).toBeFalsy();
	});
});
