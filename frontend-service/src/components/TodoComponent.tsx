import * as React from 'react';

import styles from '../styles/components/todoComponent.module.scss';
import { ITodo } from '../../../backend-service/src/models/todo';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

interface IProps {
	todo: ITodo;
	removeTodo: (
		todo: ITodo,
	) => (dispatch: any) => AxiosPromise<AxiosRequestConfig>;
	onToggle: (
		todo: ITodo,
	) => (dispatch: any) => AxiosPromise<AxiosRequestConfig>;
}

interface IState {
	completed: boolean;
}

export default class TodoComponent extends React.Component<IProps, IState> {
	state = {
		completed: false,
	};

	componentDidMount() {
		this.setState({
			completed: this.props.todo.completed,
		});
	}

	onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { todo, onToggle } = this.props;
		this.setState({ completed: e.target.checked });
		onToggle(todo);
	};

	render() {
		const { todo, removeTodo, onToggle } = this.props;
		return (
			<div className={styles.todo}>
				<input
					type="checkbox"
					name="completed"
					id="completed"
					checked={this.state.completed}
					// value={this.state.completed.toString()}
					onChange={this.onChange}
				/>
				<h3 className={styles.body}>{todo.body}</h3>
				<button className={styles.button} onClick={() => removeTodo(todo._id)}>
					Delete Todo
				</button>
			</div>
		);
	}
}
