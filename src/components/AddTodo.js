import React, { Component } from 'react';

export default class AddTodo extends Component {
	render() {
		return (
			<form onSubmit={this.props.onSubmit}>
				<input
					type="text"
					name="todoToAdd"
					value={this.props.todoToAdd}
					onChange={this.props.onChange}
				/>
				{this.props.errors && this.props.errors.noTodo ? (
					<p>Please provide a todo</p>
				) : null}
				<button type="submit">Add Todo</button>
			</form>
		);
	}
}
