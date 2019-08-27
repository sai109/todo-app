import React from 'react';
import { shallow } from 'enzyme';
import TodoComponent from '../../components/TodoComponent';

it('should render TodoComponent correctly', () => {
	const todo = {
		body: 'Test',
		completed: false,
	};
	const wrapper = shallow(
		<TodoComponent
			todo={todo}
			removeTodo={() => undefined}
			onToggle={() => undefined}
		/>
	);

	expect(wrapper).toMatchSnapshot();
});

it('should render a todo correctly', () => {
	const todo = {
		_id: 0,
		body: 'Test',
		completed: false,
	};
	const wrapper = shallow(
		<TodoComponent
			key={todo._id}
			todo={todo}
			removeTodo={() => undefined}
			onToggle={() => undefined}
		/>
	);

	expect(wrapper.find('h3').text()).toBe(todo.body);
	expect(wrapper.find('input').checked).toBeFalsy();
});

it('should update state when checkbox is ticked', () => {
	const todo = {
		body: 'Test',
		completed: false,
	};
	const wrapper = shallow(
		<TodoComponent
			todo={todo}
			removeTodo={() => undefined}
			onToggle={() => undefined}
		/>
	);
	wrapper.find('#completed').simulate('change', { target: { checked: true } });

	expect(wrapper.state().completed).toBeTruthy();
});

it('should trigger onToggle event', () => {
	const onToggle = jest.fn();

	const todo = {
		body: 'Test',
		completed: false,
	};
	const wrapper = shallow(
		<TodoComponent
			todo={todo}
			removeTodo={() => undefined}
			onToggle={onToggle}
		/>
	);
	wrapper.find('#completed').simulate('change', { target: { checked: true } });

	expect(onToggle).toHaveBeenCalledTimes(1);
	expect(onToggle).toHaveBeenCalledWith(todo, true);
});

it('should trigger removeTodo event', () => {
	const removeTodo = jest.fn();

	const todo = {
		body: 'Test',
		completed: false,
		_id: 'TEST_ID',
	};
	const wrapper = shallow(
		<TodoComponent
			todo={todo}
			removeTodo={removeTodo}
			onToggle={() => undefined}
		/>
	);
	wrapper.find('button').simulate('click');

	expect(removeTodo).toHaveBeenCalledTimes(1);
	expect(removeTodo).toHaveBeenCalledWith('TEST_ID');
});
