export default (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				token: action.payload.token,
				id: action.payload.id,
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
};
