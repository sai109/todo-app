import React, { Component } from 'react';
import TodoComponent from './TodoComponent';

export default class Todos extends Component {
	render() {
		return (
			<div>
				<h2>Todos Component</h2>
				<TodoComponent />
			</div>
		);
	}
}
