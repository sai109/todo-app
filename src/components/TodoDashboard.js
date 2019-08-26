import React, { Component } from 'react';

import AddTodo from './AddTodo';
import Todos from './Todos';
import {
	addTodo,
	getTodos,
	removeTodo,
	editTodo,
} from '../redux/actions/todos';
import { logoutUser } from '../redux/actions/auth';
import { connect } from 'react-redux';
import Header from './Header';

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

	onToggle = (todo, todoState) => {
		this.editTodo(todo._id, {
			completed: todoState,
		});
	};

	editTodo = (id, todoData) => {
		this.props.editTodo(id, todoData);
	};

	static getDerivedStateFromProps(props) {
		return {
			todos: props.todo.todos,
			filteredTodos: props.todo.todos,
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

	handleLogout = () => {
		this.props.logoutUser();
	};

	render() {
		const { loading } = this.props.todo;
		let content;
		if (loading) {
			content = <p>Loading ...</p>;
		} else {
			content = (
				<Todos
					todos={this.state.filteredTodos}
					removeTodo={this.removeTodo}
					onToggle={this.onToggle}
				/>
			);
		}
		return (
			<div>
				<Header />
				<div>
					<h1>Your Todos</h1>
					<button onClick={this.handleLogout}>Logout</button>
				</div>
				<AddTodo
					onSubmit={this.addTodo}
					ref={this.new_todo}
					onChange={this.onChange}
					todoToAdd={this.state.todoToAdd}
					errors={this.props.errors}
				/>
				{content}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	todo: state.todos,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ addTodo, getTodos, removeTodo, editTodo, logoutUser }
)(TodoDashboard);
