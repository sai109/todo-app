import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import classNames from 'classnames';

import { registerUser, clearErrors } from '../redux/actions/auth';
import styles from '../styles/components/userForm.module.scss';

export class Register extends Component {
	state = {
		email: '',
		password: '',
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const newUser = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.registerUser(newUser);
	};

	componentWillUnmount() {
		this.props.clearErrors();
	}

	render() {
		return (
			<div className={styles.page}>
				<div className={styles.content}>
					<h1 className={styles.title}>Register</h1>
					<form className={styles.form} onSubmit={this.onSubmit}>
						<div className={styles.inputGroup}>
							<label className={styles.label} htmlFor="email">
								Email
							</label>
							<input
								className={classNames(styles.input, {
									[styles.inputError]:
										this.props.errors && this.props.errors.email,
								})}
								type="text"
								name="email"
								id="email"
								value={this.state.email}
								onChange={this.onChange}
								autoComplete="email"
							/>
							{this.props.errors && this.props.errors.email ? (
								<p className={styles.error}>{this.props.errors.email}</p>
							) : null}
						</div>
						<div className={styles.inputGroup}>
							<label className={styles.label} htmlFor="password">
								Password
							</label>
							<input
								className={classNames(styles.input, {
									[styles.inputError]:
										this.props.errors && this.props.errors.password,
								})}
								type="password"
								name="password"
								id="password"
								value={this.state.password}
								onChange={this.onChange}
								autoComplete="password"
							/>
							{this.props.errors && this.props.errors.password ? (
								<p className={styles.error}>{this.props.errors.password}</p>
							) : null}
						</div>
						<button className={styles.button} type="submit">
							Register
						</button>
					</form>
					<Link className={styles.link} to="/login">
						I already have an account
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ registerUser, clearErrors }
)(Register);