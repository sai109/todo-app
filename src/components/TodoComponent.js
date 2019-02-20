import React from 'react';

export default ({ todo, removeTodo }) => (
	<div>
		<h3>{todo.body}</h3>
		<button onClick={() => removeTodo(todo._id)}>Delete Todo</button>
	</div>
);
