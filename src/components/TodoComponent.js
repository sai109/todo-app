import React from 'react';

import styles from '../styles/components/todoComponent.module.scss';

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
			<div className={styles.todo}>
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

						onToggle(todo);
					}}
				/>
				<h3 className={styles.body}>{todo.body}</h3>
				<button className={styles.button} onClick={() => removeTodo(todo._id)}>
					Delete Todo
				</button>
			</div>
		);
	}
}
