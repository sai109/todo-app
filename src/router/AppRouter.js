import React from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import TodoDashboard from '../components/TodoDashboard';

export const history = createHistory();

const AppRouter = () => (
	<Router history={history}>
		<Route path="/" component={TodoDashboard} exact={true} />
	</Router>
);

export default AppRouter;
