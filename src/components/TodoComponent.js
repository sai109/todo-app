import React from 'react';

export default class TodoComponent extends React.Component {
	state = {
		completed: false,
	};

	componentDidMount() {
		this.setState({
			completed: this.props.todo.completed,
		});
	}

	render() {
		const { todo, removeTodo, onToggle } = this.props;
		return (
			<div>
				<input
					type="checkbox"
					name="completed"
					id="completed"
					checked={this.state.completed}
					value={this.state.completed}
					onChange={e => {
						this.setState({
							completed: e.target.checked,
						});

						onToggle(todo, this.state.completed);
					}}
				/>
				<p>COmpleted State: {`${this.state.completed}`}</p>
				<h3>{todo.body}</h3>
				<button onClick={() => removeTodo(todo._id)}>Delete Todo</button>
			</div>
		);
	}
}
