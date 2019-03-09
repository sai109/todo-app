import React, { Component } from 'react';

import AddTodo from './AddTodo';
import Todos from './Todos';
import {
	addTodo,
	getTodos,
	removeTodo,
	editTodo,
} from '../redux/actions/todos';
import { connect } from 'react-redux';

class TodoDashboard extends Component {
	state = {
		todos: [],
		filterCompleted: false,
		filteredTodos: [],
		todoToAdd: '',
	};

	componentDidMount() {
		this.props.getTodos();
	}

	static getDerivedStateFromProps(props) {
		return {
			todos: props.todos,
			filteredTodos: props.todos,
		};
	}

	removeTodo = id => {
		if (this.state.todos.length > 0) {
			this.props.removeTodo(id);
			this.props.getTodos();
		}
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	addTodo = e => {
		e.preventDefault();
		this.props.addTodo({ todo: this.state.todoToAdd });
		this.props.getTodos();
	};
	render() {
		return (
			<div>
				<h1>Your Todos</h1>
				<AddTodo
					onSubmit={this.addTodo}
					ref={this.new_todo}
					onChange={this.onChange}
					todoToAdd={this.state.todoToAdd}
					errors={this.props.errors}
				/>
				<Todos
					todos={this.state.filteredTodos}
					removeTodo={this.removeTodo}
					editTodo={this.editTodo}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	todos: state.todos,
	error: state.errors,
});

export default connect(
	mapStateToProps,
	{ addTodo, getTodos, removeTodo, editTodo },
)(TodoDashboard);
