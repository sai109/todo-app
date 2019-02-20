import React, { Component } from 'react';
import Todos from './Todos';
import { getTodos, removeTodo } from '../redux/actions/todos';
import { connect } from 'react-redux';

class TodoDashboard extends Component {
	state = {
		todos: []
	};

	componentDidMount() {
		this.props.getTodos();
	}

	static getDerivedStateFromProps(props) {
		return {
			todos: props.todos
		};
	}

	removeTodo = id => {
		if (this.state.todos.length > 0) {
			this.props.removeTodo(id);
			this.props.getTodos();
		}
	};

	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<Todos todos={this.state.todos} removeTodo={this.removeTodo} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	todos: state.todos
});

export default connect(
	mapStateToProps,
	{ getTodos, removeTodo }
)(TodoDashboard);
