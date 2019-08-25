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
		loading: false,
		todos: [],
		filterCompleted: false,
		filteredTodos: [],
		todoToAdd: '',
	};

	componentWillMount() {
		this.setState({
			loading: true,
		});
		this.props.getTodos();
		this.setState({
			loading: false,
		});
	}

	onToggle = todo => {
		todo.completed = !todo.completed;
		this.editTodo(todo._id, {
			completed: todo.completed,
		});
	};

	editTodo = (id, todoData) => {
		this.props.editTodo(id, todoData);
	};

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
		const content = (
			<div>
				<div>
					<h1>Your Todos</h1>
					<button>Logout</button>
				</div>
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
					onToggle={this.onToggle}
				/>
			</div>
		);

		const toRender = this.state.loading ? <p>Loading...</p> : content;
		return toRender;
	}
}

const mapStateToProps = state => ({
	todos: state.todos,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ addTodo, getTodos, removeTodo, editTodo },
)(TodoDashboard);
