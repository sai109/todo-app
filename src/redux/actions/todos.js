import axios from 'axios';

const loadTodos = () => ({
	type: 'LOADING',
});

export const addTodo = todoData => dispatch => {
	return axios
		.post('/api/todo', todoData)
		.then(() => {
			dispatch({ type: 'CLEAR_ERRORS' });
			dispatch({
				type: 'ADD_TODO',
				todo: todoData,
			});
		})
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

export const removeTodo = id => dispatch => {
	return axios
		.delete(`/api/todo/${id}`)
		.then(
			dispatch({
				type: 'DELETE_TODO',
				id,
			})
		)
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

export const editTodo = (id, updates) => dispatch => {
	return axios
		.patch(`/api/todo/${id}`, updates)
		.then(
			dispatch({
				type: 'UPDATE_TODO',
				updates: updates,
			})
		)
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

export const getTodos = () => dispatch => {
	dispatch(loadTodos());
	return axios.get('/api/todos').then(res =>
		dispatch({
			type: 'GET_TODOS',
			todos: res.data.todos,
		})
	);
};

export const getTodo = id => ({
	type: 'GET_TODO',
	id,
});
