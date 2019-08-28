import authReducer from '../../../redux/reducer/auth';

it('should handle login corrctly', () => {
	const action = {
		type: 'LOGIN',
		payload: {
			id: 'test_id',
			token: 'test_token',
		},
	};

	const state = authReducer({}, action);

	expect(state.token).toBe(action.payload.token);
	expect(state.id).toBe(action.payload.id);
});

it('should handle logout correctly', () => {
	const action = {
		type: 'LOGOUT',
	};

	const state = authReducer({ token: 'TEST_TOKEN' }, action);

	expect(state).toEqual({});
});

it('should return state if action type not found', () => {
	const action = {
		type: 'GEN_ERRORS',
	};

	const state = authReducer({}, action);

	expect(state).toEqual({});
});

it('should set user', () => {
	const action = {
		type: 'SET_USER',
		payload: {
			token: 'test_token',
			id: 'test_id',
		},
	};

	const state = authReducer({}, action);

	expect(state).toEqual({ id: 'test_id', token: 'test_token' });
});
