import axios from 'axios';

export const addTodo = todoData => dispatch => {
	axios
		.post('/api/todo', todoData)
		.then(
			dispatch({
				type: 'ADD_TODO',
				todo: todoData
			})
		)
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const removeTodo = id => dispatch => {
	axios
		.delete(`/api/todo/${id}`)
		.then(
			dispatch({
				type: 'DELETE_TODO',
				id
			})
		)
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const editTodo = (id, updates) => dispatch => {
	axios
		.patch(`/api/todo/${id}`, updates)
		.then(
			dispatch({
				type: 'UPDATE_TODO',
				updates
			})
		)
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const getTodos = () => dispatch => {
	axios.get('/api/todos').then(res =>
		dispatch({
			type: 'GET_TODOS',
			todos: res.data.todos
		})
	);
};

export const getTodo = id => ({
	type: 'GET_TODO',
	id
});
