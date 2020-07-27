import todoReducer from '../../../redux/reducer/todo';

it('should handle get todos', () => {
	const action = {
		type: 'GET_TODOS',
		todos: [
			{
				body: 'test_todo',
			},
		],
	};

	const state = todoReducer({ todos: [], loading: false, todo: {} }, action);

	expect(state.todos).toContainEqual(action.todos[0]);
});

it('should handle get todo', () => {
	const action = {
		type: 'GET_TODO',
		id: 1,
	};

	const defaultState = {
		todos: [
			{
				id: 1,
			},
			{
				id: 2,
			},
		],
		loading: false,
		todo: {},
	};
	const state = todoReducer(defaultState, action);

	expect(state.todo).toEqual({ id: 1 });
});

it('should handle add todo', () => {
	const action = {
		type: 'ADD_TODO',
		todo: {
			id: 1,
		},
	};

	const state = todoReducer({ todos: [], loading: false, todo: {} }, action);

	expect(state.todos).toContainEqual({ id: 1 });
});

it('sholud handle delete todo', () => {
	const action = {
		type: 'DELETE_TODO',
		id: 1,
	};

	const state = todoReducer(
		{ todos: [{ id: 1 }], loading: false, todo: {} },
		action,
	);

	expect(state.todos).not.toContainEqual({ id: 1 });
});

it('should handle edit todo', () => {
	const action = {
		type: 'EDIT_TODO',
		id: 1,
		updates: {
			id: 2,
		},
	};

	const state = todoReducer(
		{ todos: [{ id: 1 }], loading: false, todo: {} },
		action,
	);

	expect(state.todos).toEqual([{ id: 2 }]);
});
