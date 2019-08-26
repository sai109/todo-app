import React from 'react';
import { shallow } from 'enzyme';

import WelcomePage from '../../components/WelcomePage';

it('should render WelcomePage correctly', () => {
	const wrapper = shallow(<WelcomePage />);
	expect(wrapper).toMatchSnapshot();
});
