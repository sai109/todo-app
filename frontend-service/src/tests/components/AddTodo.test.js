import React from 'react';
import { shallow } from 'enzyme';

import AddTodo from '../../components/AddTodo';

test('it should render add todo correctly', () => {
	const onSubmit = jest.fn();
	const wrapper = shallow(<AddTodo onSubmit={onSubmit} />);

	wrapper.find('input').value = 'New Todo';
	expect(wrapper).toMatchSnapshot();
});

it('should handle submit correctly', () => {
	const onSubmit = jest.fn();
	const wrapper = shallow(
		<AddTodo errors={{ noTodo: true }} onSubmit={onSubmit} />
	);

	wrapper.find('input').simulate('change', {
		target: {
			value: 'Todo Body',
		},
	});

	wrapper.update();
	wrapper.find('form').simulate('submit');
	expect(onSubmit).toHaveBeenCalledTimes(1);
});
