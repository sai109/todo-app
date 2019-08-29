import React, { Component } from 'react';
import classNames from 'classnames';

import styles from '../styles/components/addTodo.module.scss';
export default class AddTodo extends Component {
	render() {
		return (
			<form onSubmit={this.props.onSubmit}>
				<div className={styles.inputGroup}>
					<input
						className={classNames(styles.input, {
							[styles.inputError]:
								this.props.errors && this.props.errors.noTodo,
						})}
						type="text"
						name="todoToAdd"
						value={this.props.todoToAdd}
						onChange={this.props.onChange}
						placeholder="Enter your new todo here..."
					/>
					<button className={styles.button} type="submit">
						Add Todo
					</button>
				</div>
				{this.props.errors && this.props.errors.noTodo ? (
					<p className={styles.error}>Please provide a todo</p>
				) : null}
			</form>
		);
	}
}
