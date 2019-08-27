import React from 'react';
import { shallow } from 'enzyme';

import { TodoDashboard } from '../../components/TodoDashboard';

it('should render TodoDashboard correctly', () => {
	const wrapper = shallow(
		<TodoDashboard todo={{ todos: [] }} getTodos={() => undefined} />
	);

	expect(wrapper).toMatchSnapshot();
});

it('should call getTodos when component did mount', () => {
	const getTodos = jest.fn();
	shallow(<TodoDashboard todo={{ todos: [] }} getTodos={getTodos} />);

	expect(getTodos).toHaveBeenCalledTimes(1);
});
