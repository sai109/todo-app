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
		case 'SET_USER':
			return {
				...state,
				token: action.payload.token,
				id: action.payload.id,
			};
		default:
			return state;
	}
};
