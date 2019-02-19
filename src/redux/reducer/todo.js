const todoReducerDefaultState = [];

export default (state = todoReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [...state, action.todo];
		case 'REMOVE_TODO':
			return state.filter(({ id }) => id !== action.id);
		case 'EDIT_EXPENSE':
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
