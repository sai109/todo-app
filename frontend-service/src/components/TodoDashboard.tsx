import * as React from 'react';

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

import styles from '../styles/components/todoDashboard.module.scss';
import container from '../styles/components/container.module.scss';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { bindActionCreators } from 'redux';
import { ITodo } from '../interfaces/todo';
import { ITodoReducer } from '../interfaces/reducer';

interface ITodoUpdates {
	body: string;
}

interface IProps extends IDispatchProps {
	todo: ITodoReducer;
	errors: any;
}

interface IDispatchProps {
	getTodos: () => (dispatch: any) => AxiosPromise<AxiosRequestConfig>;
	editTodo: (
		id: ITodo['_id'],
		todoData: any,
	) => (dispatch: any) => AxiosPromise<AxiosRequestConfig>;
	logoutUser: () => (dispatch: any) => void;
	addTodo: (
		todo: ITodoToAdd,
	) => (dispatch: any) => AxiosPromise<AxiosRequestConfig>;
	removeTodo: (
		id: ITodo['_id'],
	) => (dispatch: any) => AxiosPromise<AxiosRequestConfig>;
}

interface ITodoToAdd {
	todo: string;
}

interface IState {
	todos: ITodo[];
	filterCompleted: boolean;
	filteredTodos: ITodo[];
	todoToAdd: string;
}

export class TodoDashboard extends React.Component<IProps, IState> {
	state = {
		todos: [],
		filterCompleted: false,
		filteredTodos: [],
		todoToAdd: '',
	};

	componentDidMount() {
		this.props.getTodos();
	}

	onToggle = (todo: ITodo) => {
		this.editTodo(todo._id, {
			completed: !todo.completed,
		});
	};

	editTodo = (id: ITodo['_id'], todoData: any) => {
		this.props.editTodo(id, todoData);
	};

	static getDerivedStateFromProps(props: IProps) {
		return {
			todos: props.todo.todos,
			filteredTodos: props.todo.todos,
		};
	}

	removeTodo = (id: ITodo['_id']) => {
		if (this.state.todos.length > 0) {
			this.props.removeTodo(id);
			this.props.getTodos();
		}
	};

	onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ todoToAdd: e.target.value });
	};

	addTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		this.props.addTodo({ todo: this.state.todoToAdd });
		if (this.state.todoToAdd !== '') {
			this.props.getTodos();
		}
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
			<div className={styles.content}>
				<Header />
				<div className={container.wrapper}>
					<div>
						<h1>Your Todos</h1>
						<button onClick={this.handleLogout}>Logout</button>
					</div>
					<AddTodo
						onSubmit={this.addTodo}
						onChange={this.onChange}
						todoToAdd={this.state.todoToAdd}
						errors={this.props.errors}
					/>
					{content}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	todo: state.todos,
	errors: state.errors,
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
	return bindActionCreators(
		{
			addTodo,
			getTodos,
			removeTodo,
			editTodo,
			logoutUser,
		},
		dispatch,
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoDashboard);
