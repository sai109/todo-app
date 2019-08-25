import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

import * as todoActions from '../../../redux/actions/todos';

it('should add a todo', () => {
	const todoData = {
		id: 'THIS_IS_A_TODO_ID',
		body: 'TEST_TODO',
	};
	mockAxios.post.mockImplementationOnce(() => Promise.resolve(todoData));

	const expectedActions = [
		{
			type: 'ADD_TODO',
			todo: {
				...todoData,
			},
		},
	];

	const store = mockStore();

	store.dispatch(todoActions.addTodo(todoData)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
});

it('should handle add todo error', () => {
	const errorData = {
		data: 'A body for the todo is required',
	};

	mockAxios.post.mockImplementationOnce(() => Promise.reject(errorData));

	const expectedActions = [
		{
			type: 'GET_ERRORS',
			payload: errorData.response,
		},
	];

	const store = mockStore();

	store.dispatch(todoActions.addTodo({})).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
});

it('should remove a todo', () => {
	const id = '23rtrewrgrerrg';

	mockAxios.delete.mockImplementationOnce(() => Promise.resolve());

	const expectedActions = [
		{
			type: 'DELETE_TODO',
			id,
		},
	];

	const store = mockStore();

	store.dispatch(todoActions.removeTodo(id)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
});

it('should handle remove todo error', () => {
	const id = '23rtrewrgrerrg';
	const errorData = {
		data: 'A todo with that id was not found',
	};

	mockAxios.delete.mockImplementationOnce(() => Promise.reject(errorData));

	const expectedActions = [
		{
			type: 'GET_ERRORS',
			payload: errorData.data,
		},
	];

	const store = mockStore();

	store.dispatch(todoActions.removeTodo(id)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
});

it('should edit a todo', () => {
	const id = '3retr54wtw4';
	const updates = {
		body: 'TEST_TODO',
	};

	mockAxios.patch.mockImplementationOnce(() => Promise.resolve({}));

	const expectedActions = [
		{
			type: 'UPDATE_TODO',
			updates,
		},
	];

	const store = mockStore();

	store.dispatch(todoActions.editTodo(id, updates)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
});

it('should handle edit todo error', () => {
	const id = '3retr54wtw4';
	const updates = {
		body: 'TEST_TODO',
	};
	const errorData = {
		data: 'A todo with that id was not found',
	};
	mockAxios.patch.mockImplementationOnce(() => Promise.reject(errorData));

	const expectedActions = [
		{
			type: 'GET_ERRORS',
			payload: errorData.data,
		},
	];

	const store = mockStore();

	store.dispatch(todoActions.editTodo(id, updates)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
});

it('should get todos', () => {
	const result = {
		data: {
			todos: [
				{
					body: 'TEST_TODO',
				},
			],
		},
	};
	mockAxios.get.mockImplementationOnce(() => Promise.resolve(result));

	const expectedActions = [
		{
			type: 'GET_TODOS',
			todos: result.data.todos,
		},
	];

	const store = mockStore();

	store.dispatch(todoActions.getTodos()).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
});

it('should get a todo', () => {
	const action = {
		type: 'GET_TODO',
		id: 'TEST_ID',
	};

	expect(todoActions.getTodo(action.id)).toEqual(action);
});
