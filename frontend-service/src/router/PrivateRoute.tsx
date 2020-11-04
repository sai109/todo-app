import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
	isAuthenticated: boolean;
	component: React.ComponentType<any>;
}

export const PrivateRoute: React.FC<ProtectedRouteProps> = ({
	isAuthenticated,
	component: Component,
	...rest
}) => (
	<Route
		{...rest}
		component={(props: any) =>
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

const mapStatesToProps = (state: any) => ({
	isAuthenticated: !!state.user.token,
});

export default connect(mapStatesToProps)(PrivateRoute);
