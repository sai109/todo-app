import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/auth';
import { history } from '../utils/history';

export class Login extends Component {
	state = {
		email: '',
		password: '',
	};

	onSubmit = e => {
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(user, history);
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.onSubmit}>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						id="email"
						value={this.state.email}
						onChange={this.onChange}
						autoComplete="email"
					/>
					{this.props.errors && this.props.errors.email ? (
						<p>{this.props.errors.email}</p>
					) : null}
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={this.state.password}
						onChange={this.onChange}
						autoComplete="password"
					/>
					{this.props.errors && this.props.errors.password ? (
						<p>{this.props.errors.password}</p>
					) : null}
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
