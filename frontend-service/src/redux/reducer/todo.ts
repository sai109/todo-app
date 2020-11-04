import { ITodoReducer } from '../../interfaces/reducer';

const todoReducerDefaultState: ITodoReducer = {
	todos: [],
	todo: {},
	loading: false,
};

export default (state: ITodoReducer = todoReducerDefaultState, action: any) => {
	const editedTodos = state.todos.map(todo => {
		if (todo.id === action.id) {
			const newTodo = {
				...todo,
				...action.updates,
			};
			return newTodo;
		} else {
			return todo;
		}
	});

	switch (action.type) {
		case 'LOADING':
			return {
				...state,
				loading: true,
			};
		case 'GET_TODOS':
			return {
				...state,
				todos: [...action.todos],
				loading: false,
			};
		case 'GET_TODO':
			return {
				...state,
				todo: state.todos.filter(({ id }) => id === action.id)[0],
			};
		case 'ADD_TODO':
			return { ...state, todos: [action.todo, ...state.todos] };
		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter(({ id }) => id !== action.id),
			};
		case 'EDIT_TODO':
			return {
				...state,
				todos: editedTodos,
			};
		default:
			return state;
	}
};
