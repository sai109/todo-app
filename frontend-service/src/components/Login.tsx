import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { loginUser, clearErrors } from '../redux/actions/auth';
import history from '../utils/history';
import styles from '../styles/components/userForm.module.scss';
import { AxiosRequestConfig } from 'axios';
import History from 'history';

interface IErrors {
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

interface IReduxProps {
	errors: IErrors;
}

interface IDispatchProps {
	loginUser: (user: IUser, history: any) => (dispatch: any) => Promise<any>;
	clearErrors: () => { type: string };
}

interface IProps extends IReduxProps {
	loginUser: (user: IUser, history: any) => (dispatch: any) => Promise<any>;
	clearErrors: () => { type: string };
}

export class Login extends React.Component<IProps, IState> {
	readonly state = {
		email: '',
		password: '',
	};

	onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(user, history);
	};

	onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearErrors();
	}

	render() {
		return (
			<div className={styles.page}>
				<div className={styles.content}>
					<h1 className={styles.title}>Login</h1>
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
							Login
						</button>
					</form>
					<Link className={styles.link} to="/register">
						I need an account
					</Link>
				</div>
			</div>
		);
	}
}

// TODO: change state to match redux state interface
const mapStateToProps = (state: any): IReduxProps => ({
	errors: state.errors,
});

const mapDispatchToProps = (): IDispatchProps => ({
	loginUser,
	clearErrors,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
