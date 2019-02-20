import React from 'react';
import TodoComponent from './TodoComponent';

export default props => (
	<div className="todos">
		<h2>Todo Component</h2>
		{props.todos.map(todo => (
			<TodoComponent key={todo._id} todo={todo} removeTodo={props.removeTodo} />
		))}
	</div>
);
