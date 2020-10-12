import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export const PublicRoute = ({
	isAuthenticated,
	component: Component,
	...rest
}) => (
	<Route
		{...rest}
		component={props =>
			!isAuthenticated ? (
				<div>
					<Component {...props} />
				</div>
			) : (
				<Redirect to="/dashboard" />
			)
		}
	/>
);

const mapStateToProps = state => ({
	isAuthenticated: !!state.user.token,
});

export default connect(mapStateToProps)(PublicRoute);
