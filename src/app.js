import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import store from './redux/store';
import { logoutUser, setCurrentUser } from './redux/actions/auth';

import AppRouter from './router/AppRouter';
import setAuthToken from './utils/setAuthToken';
import 'normalize.css/normalize.css';
import './styles/main.scss';

if (localStorage.token) {
	const decoded = jwt_decode(localStorage.token);
	const currentTime = Date.now() / 1000;

	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		setAuthToken(localStorage.token);
		store.dispatch(setCurrentUser(decoded, localStorage.token));
	}
}

ReactDOM.render(<AppRouter />, document.getElementById('app'));
