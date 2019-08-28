import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/components/welcomePage.module.scss';
import Header from './Header';

export default class WelcomePage extends Component {
	render() {
		return (
			<div className={styles.page}>
				<Header />
				<div className={styles.content}>
					<div>
						<h1 className={styles.title}>Time to take back control</h1>
						<div className={styles.buttonGroup}>
							<Link className={styles.button} to="/login">
								Login
							</Link>
							<Link className={styles.button} to="/register">
								Register
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
