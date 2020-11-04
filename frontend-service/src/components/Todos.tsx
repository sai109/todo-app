import * as React from 'react';
import TodoComponent from './TodoComponent';
import { ITodo } from '../interfaces/todo';

interface IProps {
	todos: ITodo[];
	removeTodo: (id: ITodo['_id']) => void;
	onToggle: (todo: ITodo) => void;
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
