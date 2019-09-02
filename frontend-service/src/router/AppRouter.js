import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';
import { history } from '../utils/history';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import TodoDashboard from '../components/TodoDashboard';
import Login from '../components/Login';
import Register from '../components/Register';

const AppRouter = () => (
	<Provider store={store}>
		<Router history={history}>
			<Switch>
				<PublicRoute path="/" component={Login} exact={true} />
				<PrivateRoute
					path="/dashboard"
					component={TodoDashboard}
					exact={true}
				/>
				<PublicRoute path="/login" component={Login} exact={true} />
				<PublicRoute path="/register" component={Register} exact={true} />
			</Switch>
		</Router>
	</Provider>
);

export default AppRouter;
