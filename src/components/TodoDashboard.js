import React, { Component } from 'react';
import Todos from './Todos';

export default class TodoDashboard extends Component {
	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<Todos />
			</div>
		);
	}
}
