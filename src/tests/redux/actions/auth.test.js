import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as userActions from '../../../redux/actions/auth';
import mockAxios from 'axios';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

it('should login a user', done => {
	const history = {
		push: jest.fn(),
	};
	mockAxios.post.mockImplementationOnce(() =>
		Promise.resolve({
			data: {
				success: true,
				id: 'Test',
				token: 'RANDOM_JWT_TOKEN',
			},
		})
	);

	const expectedActions = [
		{
			type: 'LOGIN',
			payload: {
				id: 'Test',
				token: 'RANDOM_JWT_TOKEN',
			},
		},
		{ type: 'CLEAR_ERRORS' },
	];

	const userData = {
		email: 'test@example.com',
		password: 'A123456*&a',
	};
	const store = mockStore();

	store.dispatch(userActions.loginUser(userData, history)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
		expect(mockAxios.post).toHaveBeenCalledTimes(1);
		expect(mockAxios.post).toHaveBeenCalledWith('/api/login', userData);
		expect(history.push).toHaveBeenCalledTimes(1);
		expect(history.push).toHaveBeenCalledWith('/dashboard');
	});

	done();
});

it('should not login a user', done => {
	mockAxios.post.mockImplementationOnce(() =>
		Promise.reject({
			payload: {
				email: 'That email is already taken',
			},
		})
	);

	const expectedActions = [
		{
			type: 'GET_ERRORS',
			payload: {
				email: 'That email is already taken',
			},
		},
	];

	const userData = {
		email: 'test@example.com',
		password: 'A123456*&a',
	};
	const store = mockStore();

	store.dispatch(userActions.loginUser(userData, history)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});

	done();
});

it('should register a user', done => {
	mockAxios.post.mockImplementationOnce(() =>
		Promise.resolve({
			id: 'Test',
			token: 'RANDOM_JWT_TOKEN',
		})
	);

	const userData = {
		email: 'test@test.io',
		password: '123454rA%&',
	};

	const expectedActions = [
		{
			type: 'CLEAR_ERRORS',
		},
	];

	const store = mockStore();

	store.dispatch(userActions.registerUser(userData)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
	done();
});

it('should not register a user', done => {
	mockAxios.post.mockImplementationOnce(() =>
		Promise.reject({
			payload: {
				email: 'That email is already taken',
			},
		})
	);

	const expectedActions = [
		{
			type: 'GET_ERRORS',
			payload: {
				email: 'That email is already taken',
			},
		},
	];

	const userData = {
		email: 'test@example.com',
		password: 'A123456*&a',
	};
	const store = mockStore();

	store.dispatch(userActions.loginUser(userData, history)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});

	done();
});

it('should logout a user', done => {
	const store = mockStore();
	store.dispatch(userActions.logoutUser());
	expect(store.getActions()).toEqual([{ type: 'LOGOUT' }]);
	done();
});

it('should set current user', done => {
	const store = mockStore();

	store.dispatch(userActions.setCurrentUser({ id: 'TEST_ID' }, 'TEST_TOKEN'));
	expect(store.getActions()).toEqual([
		{
			type: 'SET_USER',
			payload: {
				id: 'TEST_ID',
				token: 'TEST_TOKEN',
			},
		},
	]);
	done();
});
