const todoReducerDefaultState = [];

export default (state = todoReducerDefaultState, action) => {
	switch (action.type) {
		case 'GET_TODOS':
			return [...actions.todos];
		case 'GET_TODO':
			return state.filter(({ id }) => id === action.id);
		case 'ADD_TODO':
			return [...state, action.todo];
		case 'DELETE_TODO':
			return state.filter(({ id }) => id !== action.id);
		case 'EDIT_TODO':
			return state.map(todo => {
				if (todo.id === action.id) {
					return {
						...todo,
						...todo.updates
					};
				} else {
					return todo;
				}
			});
		default:
			return state;
	}
};
