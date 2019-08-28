import errorReducer from '../../../redux/reducer/errors';

it('should handle get errors', () => {
	const action = {
		type: 'GET_ERRORS',
		payload: {
			email: 'email already exists',
		},
	};

	const state = errorReducer({}, action);
	expect(state).toHaveProperty('email', 'email already exists');
});

it('should handle clear error', () => {
	const action = {
		type: 'CLEAR_ERRORS',
	};

	const state = errorReducer({ email: 'email already exists' }, action);

	expect(state).toEqual({});
});

it('should return state if action type not found', () => {
	const action = {
		type: 'GEN_ERRORS',
	};

	const state = errorReducer({}, action);

	expect(state).toEqual({});
});
