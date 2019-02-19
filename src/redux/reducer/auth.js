export default (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				token: action.token,
				id: action.id
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
};
