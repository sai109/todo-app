import React from 'react';
import { shallow, mount } from 'enzyme';

import { TodoDashboard } from '../../components/TodoDashboard';
import AddTodo from '../../components/AddTodo';
import TodoComponent from '../../components/TodoComponent';

it('should render TodoDashboard correctly', () => {
	const wrapper = shallow(
		<TodoDashboard todo={{ todos: [] }} getTodos={() => undefined} />,
	);

	expect(wrapper).toMatchSnapshot();
});

it('should call getTodos when component did mount', () => {
	const getTodos = jest.fn();
	shallow(<TodoDashboard todo={{ todos: [] }} getTodos={getTodos} />);

	expect(getTodos).toHaveBeenCalledTimes(1);
});

it('should update state when new todo is added is updated', () => {
	const wrapper = mount(
		<TodoDashboard todo={{ todos: [] }} getTodos={() => []} />,
	);

	wrapper
		.find(AddTodo)
		.find('input')
		.simulate('change', {
			target: {
				name: 'todoToAdd',
				value: 'Test',
			},
		});

	expect(wrapper.state().todoToAdd).toBe('Test');
});

it('should call onSubmit correctly', () => {
	const addTodo = jest.fn();
	const wrapper = mount(
		<TodoDashboard
			todo={{ todos: [] }}
			getTodos={() => []}
			addTodo={addTodo}
		/>,
	);

	wrapper
		.find(AddTodo)
		.find('input')
		.simulate('change', {
			target: {
				name: 'todoToAdd',
				value: 'Test',
			},
		});

	wrapper
		.find(AddTodo)
		.find('form')
		.simulate('submit');

	expect(addTodo).toHaveBeenCalledTimes(1);
	expect(addTodo).toHaveBeenCalledWith({ todo: 'Test' });
});

it('should handle logout correctly', () => {
	const logoutUser = jest.fn();
	const wrapper = shallow(
		<TodoDashboard
			todo={{ todos: [] }}
			getTodos={() => []}
			logoutUser={logoutUser}
		/>,
	);

	wrapper.find('button').simulate('click');

	expect(logoutUser).toHaveBeenCalledTimes(1);
});

it('should handle toggling todo correctly', () => {
	const editTodo = jest.fn();
	const wrapper = mount(
		<TodoDashboard
			todo={{ todos: [{ _id: 1, body: 'Test', completed: false }] }}
			editTodo={editTodo}
			getTodos={() => undefined}
		/>,
	);

	wrapper.find('#completed').simulate('change', {
		target: {
			checked: true,
		},
	});

	expect(editTodo).toHaveBeenCalledTimes(1);
});

it('should handle removeTodo correctly', () => {
	const removeTodo = jest.fn();
	const getTodos = jest.fn();
	const wrapper = mount(
		<TodoDashboard
			todo={{ todos: [{ _id: 1, body: 'Test', completed: false }] }}
			removeTodo={removeTodo}
			getTodos={getTodos}
		/>,
	);

	wrapper
		.find(TodoComponent)
		.find('button')
		.simulate('click');

	expect(removeTodo).toHaveBeenCalledTimes(1);
	expect(getTodos).toHaveBeenCalledTimes(2);
});
