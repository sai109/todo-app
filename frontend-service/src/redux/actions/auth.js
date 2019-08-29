import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

export const registerUser = userData => dispatch => {
	return axios
		.post('/api/register', userData)
		.then(() => {
			dispatch({ type: 'CLEAR_ERRORS' });
			loginUser(userData);
		})
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

export const loginUser = (userData, history) => dispatch => {
	return axios
		.post('/api/login', userData)
		.then(res => {
			const { token, id } = res.data;
			localStorage.setItem('token', token);
			setAuthToken(token);
			dispatch({ type: 'LOGIN', payload: { id, token } });
			history.push('/dashboard');
			dispatch({ type: 'CLEAR_ERRORS' });
		})
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

export const logoutUser = () => dispatch => {
	localStorage.removeItem('token');
	setAuthToken(undefined);
	dispatch({ type: 'LOGOUT' });
};

export const setCurrentUser = ({ id }, token) => dispatch => {
	dispatch({
		type: 'SET_USER',
		payload: { id, token },
	});
};

export const clearErrors = () => ({
	type: 'CLEAR_ERRORS',
});
