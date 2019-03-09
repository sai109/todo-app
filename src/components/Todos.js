import React from 'react';
import TodoComponent from './TodoComponent';

export default props => (
	<div className="todos">
		{props.todos.map(todo => (
			<TodoComponent
				key={todo._id}
				todo={todo}
				removeTodo={props.removeTodo}
				editTodo={props.editTodo}
			/>
		))}
	</div>
);
