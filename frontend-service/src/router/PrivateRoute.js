import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
	isAuthenticated,
	component: Component,
	...rest
}) => (
	<Route
		{...rest}
		component={props =>
			isAuthenticated ? (
				<div>
					<Component {...props} />
				</div>
			) : (
				<Redirect to="/" />
			)
		}
	/>
);

const mapStatesToProps = state => ({
	isAuthenticated: !!state.user.token,
});

export default connect(mapStatesToProps)(PrivateRoute);
