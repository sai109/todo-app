import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default class WelcomePage extends Component {
	render() {
		return (
			<div>
				<Header />
				<h1>Time To Take Back Control</h1>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
				<Footer />
			</div>
		);
	}
}
