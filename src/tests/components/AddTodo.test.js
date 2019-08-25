import React from 'react';
import { shallow } from 'enzyme';

import AddTodo from '../../components/AddTodo';

test('it should render add todo correctly', () => {
	const wrapper = shallow(<AddTodo errors={{ noTodo: true }} />);

	expect(wrapper).toMatchSnapshot();
});
