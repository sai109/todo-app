import React from 'react';
import TodoComponent from './TodoComponent';

export default props => (
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
