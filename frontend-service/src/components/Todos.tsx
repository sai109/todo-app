import * as React from 'react';
import TodoComponent from './TodoComponent';
import { ITodo } from '../../../backend-service/src/models/todo';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

interface IProps {
	todos: [ITodo];
	removeTodo: (
		todo: ITodo,
	) => (dispatch: any) => AxiosPromise<AxiosRequestConfig>;
	onToggle: (
		todo: ITodo,
	) => (dispatch: any) => AxiosPromise<AxiosRequestConfig>;
}

const Todos: React.FC<IProps> = props => (
	<div className="todos">
		{props.todos.length < 1 && <p>Please create a todo to get started</p>}
		{props.todos.map(todo => (
			<TodoComponent
				key={todo._id}
				todo={todo}
				removeTodo={props.removeTodo}
				onToggle={props.onToggle}
			/>
		))}
	</div>
);

export default Todos;
