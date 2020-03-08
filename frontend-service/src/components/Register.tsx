import * as React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { registerUser, clearErrors } from '../redux/actions/auth';
import * as styles from '../styles/components/userForm.module.scss';

export interface IErrors {
	email: string | undefined;
	password: string | undefined;
}

interface IUser {
	email: string;
	password: string;
}

interface IState {
	email: string;
	password: string;
	[key: string]: string;
}

interface IMappedProps {
	errors: IErrors;
}

interface IDispatchProps {
	registerUser: (user: IUser) => (dispatch: any) => Promise<any>;
	clearErrors: () => { type: string };
}

interface IProps extends IMappedProps {
	registerUser: (user: IUser) => (dispatch: any) => Promise<any>;
	clearErrors: () => { type: string };
}

export class Register extends React.Component<IProps, IState> {
	readonly state = {
		email: '',
		password: '',
	};

	onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

const mapStateToProps = (state: any): IMappedProps => ({
	errors: state.errors,
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
	return bindActionCreators(
		{
			registerUser,
			clearErrors
		},
		dispatch
	)
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
