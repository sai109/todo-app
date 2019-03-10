import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default class WelcomePage extends Component {
	render() {
		return (
			<div>
				<div className="page-content welcome-page">
					<div className="content-wrapper">
						<Header />
						<div className="centre">
							<h1 className="welcome-page__title">Time To Take Back Control</h1>
							<div className="button-group">
								<Link className="button button-group__button" to="/login">
									Login
								</Link>
								<Link className="button button-group__button" to="/register">
									Register
								</Link>
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</div>
		);
	}
}
