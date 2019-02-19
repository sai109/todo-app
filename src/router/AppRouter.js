import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';
import { history } from '../utils/history';
import TodoDashboard from '../components/TodoDashboard';
import WelcomePage from '../components/WelcomePage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Register from '../components/Register';

const AppRouter = () => (
	<Provider store={store}>
		<Router history={history}>
			<div className="App">
				<Header />
				<Switch>
					<Route path="/" component={WelcomePage} exact={true} />
					<Route path="/dashboard" component={TodoDashboard} exact={true} />
					<Route path="/login" component={Login} exact={true} />
					<Route path="/register" component={Register} exact={true} />
				</Switch>
				<Footer />
			</div>
		</Router>
	</Provider>
);

export default AppRouter;
