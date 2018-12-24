const expect = require('expect');
const { app } = require('../server');
const request = require('supertest');
const { User } = require('../models/user');
const { users, populateUsers, populateTodos } = require('./seeds/seeds');
const { Todo } = require('../models/todo');
const jwt = require('jsonwebtoken');

beforeEach(populateUsers);
beforeEach(populateTodos);

afterEach(done => {
	Todo.remove({}).then(() => done());
});

afterEach(done => {
	User.remove({}).then(() => done());
});

describe('POST /register', () => {
	it('should register a new user', done => {
		const email = 'example@gmail.com';
		const password = '1234567';
		request(app)
			.post('/api/register')
			.send({ email, password })
			.expect(200)
			.end(err => {
				if (err) {
					return done(err);
				}
				User.findOne({ email })
					.then(user => {
						expect(user.email).toBe(email);
						expect(user.password).not.toBe(password);
						return done();
					})
					.catch(err => done(err));
			});
	});

	it('should send 400 if email already exists', done => {
		const email = users[0].email;
		const password = '1234568';
		request(app)
			.post('/api/register')
			.send({ email, password })
			.expect(400)
			.end(done);
	});

	it('should send 400 if email not provided', done => {
		const password = '12345678';
		request(app)
			.post('/api/register')
			.send({ password })
			.expect(400)
			.end(done);
	});

	it('should send 400 if email not valid', done => {
		const password = '12345678';
		const email = 'luke123.com';
		request(app)
			.post('/api/register')
			.send({ email, password })
			.expect(400)
			.end(done);
	});

	it('should send 400 if password not provided', done => {
		const email = 'example@gmail.com';
		request(app)
			.post('/api/register')
			.send({ email })
			.expect(400)
			.end(done);
	});

	it('should send 400 if password less than 6 characters', done => {
		const email = 'example@gmail.com';
		const password = '1234';
		request(app)
			.post('/api/register')
			.send({ email, password })
			.expect(400)
			.end(done);
	});
});

describe('GET /login', () => {
	const email = 'example@example.com';
	const password = '1234567';
	it('should logine if email and password are correct', done => {
		request(app)
			.post('/api/register')
			.send({ email, password })
			.expect(200)
			.end(() => {
				request(app)
					.get('/api/login')
					.send({ email, password })
					.expect(200)
					.end(done);
			});
	});

	it('should send 400 if email not provided', done => {
		request(app)
			.post('/api/register')
			.send({ password })
			.expect(400)
			.end(done);
	});

	it('should send 400 if email not valid', done => {
		const email = 'luke123.com';
		request(app)
			.post('/api/register')
			.send({ email, password })
			.expect(400)
			.end(done);
	});

	it('should send 400 if password not provided', done => {
		request(app)
			.post('/api/register')
			.send({ email })
			.expect(400)
			.end(done);
	});
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
			.end(done);
	});
});
