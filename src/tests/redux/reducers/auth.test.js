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
