import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

interface IUserData {
	email: string;
	password: string;
}

export const registerUser = (userData: IUserData) => async (dispatch: any) => {
	try {
		await axios.post('/api/register', userData);
		dispatch({ type: 'CLEAR_ERRORS' });
		loginUser(userData);
	} catch (err) {
		return dispatch({
			type: 'GET_ERRORS',
			payload: err.response.data,
		});
	}
};

export const loginUser = (userData: IUserData, history?: any) => async (
	dispatch: any,
) => {
	try {
		const res = await axios.post('/api/login', userData);
		const { token, id } = res.data;
		localStorage.setItem('token', token);
		setAuthToken(token);
		dispatch({ type: 'LOGIN', payload: { id, token } });
		history.push('/dashboard');
		dispatch({ type: 'CLEAR_ERRORS' });
	} catch (err) {
		return dispatch({
			type: 'GET_ERRORS',
			payload: err.response.data,
		});
	}
};

export const logoutUser = () => (dispatch: any) => {
	localStorage.removeItem('token');
	setAuthToken(undefined);
	dispatch({ type: 'LOGOUT' });
};

export const setCurrentUser = ({ id }: any, token: string) => (
	dispatch: any,
) => {
	dispatch({
		type: 'SET_USER',
		payload: { id, token },
	});
};

export const clearErrors = () => ({
	type: 'CLEAR_ERRORS',
});
