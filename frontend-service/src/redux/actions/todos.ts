import axios from 'axios';
import { IUser } from '../../interfaces/user';

interface IUpdateTodo {
	body?: string;
	completed?: boolean;
}

interface ITodoData {
	todo: string;
}

const loadTodos = () => ({
	type: 'LOADING',
});

export const addTodo = (todoData: ITodoData) => async (dispatch: any) => {
	try {
		await axios.post('/api/todo', todoData);
		dispatch({ type: 'CLEAR_ERRORS' });
		dispatch({
			type: 'ADD_TODO',
			todo: todoData,
		});
	} catch (err) {
		return dispatch({
			type: 'GET_ERRORS',
			payload: err.response.data,
		});
	}
};

export const removeTodo = (id: IUser['_id']) => async (dispatch: any) => {
	try {
		await axios.delete(`/api/todo/${id}`);
		dispatch({
			type: 'DELETE_TODO',
			id,
		});
	} catch (err) {
		return dispatch({
			type: 'GET_ERRORS',
			payload: err.response.data,
		});
	}
};

export const editTodo = (id: IUser['_id'], updates: IUpdateTodo) => async (
	dispatch: any,
) => {
	try {
		await axios.patch(`/api/todo/${id}`, updates);
		dispatch({
			type: 'UPDATE_TODO',
			updates: updates,
		});
	} catch (err) {
		return dispatch({
			type: 'GET_ERRORS',
			payload: err.response.data,
		});
	}
};

export const getTodos = () => async (dispatch: any) => {
	dispatch(loadTodos());
	const res = await axios.get('/api/todos');
	return dispatch({
		type: 'GET_TODOS',
		todos: res.data.todos,
	});
};

export const getTodo = (id: IUser['_id']) => ({
	type: 'GET_TODO',
	id,
});
