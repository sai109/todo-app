import React from 'react';
import { shallow } from 'enzyme';
import Todos from '../../components/Todos';

it('should render Todos component correctly', () => {
	const wrapper = shallow(<Todos todos={[]} />);

	expect(wrapper).toMatchSnapshot();
});

it('should render no todos message if array empty', () => {
	const wrapper = shallow(<Todos todos={[]} />);

	expect(wrapper.find('p').text()).toBe('Please create a todo to get started');
});

it('should not render message if todos are found', () => {
	const wrapper = shallow(<Todos todos={[{ _id: 0, body: 'Test todo' }]} />);

	expect(wrapper.find('p')).toHaveLength(0);
});
