import * as React from 'react';
import classNames from 'classnames';
import * as styles from '../styles/components/addTodo.module.scss';

interface IErrors {
	[key: string]: string;
}

interface IProps {
	errors: IErrors | undefined;
	todoToAdd: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddTodo: React.FC<IProps> = props => (
	<form onSubmit={props.onSubmit}>
		<div className={styles.inputGroup}>
			<input
				className={classNames(styles.input, {
					[styles.inputError]: props.errors && props.errors.noTodo,
				})}
				type="text"
				name="todoToAdd"
				value={props.todoToAdd}
				onChange={props.onChange}
				placeholder="Enter your new todo here..."
			/>
			<button className={styles.button} type="submit">
				Add Todo
			</button>
		</div>
		{props.errors && props.errors.noTodo ? (
			<p className={styles.error}>Please provide a todo</p>
		) : null}
	</form>
);

export default AddTodo;
