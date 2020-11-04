import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PublicRouteProps extends RouteProps {
	isAuthenticated: boolean;
	component: React.ComponentType<any>;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
	isAuthenticated,
	component: Component,
	...rest
}) => (
	<Route
		{...rest}
		component={(props: any) =>
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

const mapStateToProps = (state: any) => ({
	isAuthenticated: !!state.user.token,
});

export default connect(mapStateToProps)(PublicRoute);
