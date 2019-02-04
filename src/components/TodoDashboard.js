import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Todos from './Todos';

export default class TodoDashboard extends Component {
	render() {
		return (
			<div>
				<Header />
				<h1>Dashboard</h1>
				<Todos />
				<Footer />
			</div>
		);
	}
}
