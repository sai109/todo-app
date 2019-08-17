import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as userActions from '../../../redux/actions/auth';
import mockAxios from 'axios';
import history from 'history';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

afterEach(() => {
	fetchMock.reset();
});

it('should login a user', done => {
	mockAxios.post.mockImplementationOnce(() =>
		Promise.resolve({
			data: {
				success: true,
				id: 'Test',
				token: 'RANDOM_JWT_TOKEN',
			},
		}),
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
