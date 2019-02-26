const expect = require('expect');
const app = require('../../app');
const request = require('supertest');
const { User } = require('../../models/user');
const { users, populateUsers } = require('../seeds/seeds');

beforeEach(populateUsers);

afterEach(done => {
	User.remove({}).then(() => done());
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
