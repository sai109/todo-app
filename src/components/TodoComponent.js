import React from 'react';

// export default ({ todo, removeTodo, onToggle }) => (
// 	<div>
// 		<input
// 			type="checkbox"
// 			name="completed"
// 			id="completed"
// 			checked={todo.completed}
// 			value={todo.completed}
// 			onChange={e => {
// 				todo.completed = !todo.completed;

// 				// onToggle(todo, e.target.checked);
// 			}}
// 		/>
// 		<h3>{todo.body}</h3>
// 		<button onClick={() => removeTodo(todo._id)}>Delete Todo</button>
// 	</div>
// );

export default class TodoComponent extends React.Component {
	state = {
		completed: false,
	};

	static getDerivedStateFromProps(props) {
		return {
			completed: props.todo.completed,
		};
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
