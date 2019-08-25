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

	const state = todoReducer([], action);

	expect(state).toContainEqual(action.todos[0]);
});

it('should handle get todo', () => {
	const action = {
		type: 'GET_TODO',
		id: 1,
	};

	const defaultState = [
		{
			id: 1,
		},
		{
			id: 2,
		},
	];
	const state = todoReducer(defaultState, action);

	expect(state).toEqual([{ id: 1 }]);
});

it('should handle add todo', () => {
	const action = {
		type: 'ADD_TODO',
		todo: {
			id: 1,
		},
	};

	const state = todoReducer([], action);

	expect(state).toContainEqual({ id: 1 });
});

it('sholud handle delete todo', () => {
	const action = {
		type: 'DELETE_TODO',
		id: 1,
	};

	const state = todoReducer([{ id: 1 }], action);

	expect(state).not.toContainEqual({ id: 1 });
});

it('should handle edit todo', () => {
	const action = {
		type: 'EDIT_TODO',
		id: 1,
		updates: {
			id: 2,
		},
	};

	const state = todoReducer([{ id: 1 }], action);

	expect(state).toEqual([{ id: 2 }]);
});
