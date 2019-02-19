import React from 'react';
import { Router, Route } from 'react-router-dom';

import { history } from '../utils/history';
import TodoDashboard from '../components/TodoDashboard';

const AppRouter = () => (
	<Router history={history}>
		<Route path="/" component={TodoDashboard} exact={true} />
	</Router>
);

export default AppRouter;
