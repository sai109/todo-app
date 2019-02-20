import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/register', userData)
		.then(() => history.push('/login'))
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const loginUser = (userData, history) => dispatch => {
	axios
		.post('/api/login', userData)
		.then(res => {
			const { token, id } = res.data;
			localStorage.setItem('token', token);
			setAuthToken(token);
			dispatch({ type: 'LOGIN', payload: { id, token } });
			history.push('/dashboard');
		})
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
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
		payload: { id, token }
	});
};