import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../../components/Register';

it('should render register component correctly', () => {
	const wrapper = shallow(<Register />);

	expect(wrapper).toMatchSnapshot();
});

it('should change user state correctly', () => {
	const wrapper = shallow(<Register />);

	const email = 'test@test.io';
	const password = 'password';

	wrapper.find('#email').simulate('change', {
		target: {
			name: 'email',
			value: email,
		},
	});
	wrapper.find('#password').simulate('change', {
		target: {
			name: 'password',
			value: password,
		},
	});
	wrapper.update();

	expect(wrapper.state().email).toBe(email);
	expect(wrapper.state().password).toBe(password);
});

it('should handle user register correctly', () => {
	const registerUser = jest.fn();
	const wrapper = shallow(<Register registerUser={registerUser} />);

	const email = 'test@test.io';
	const password = 'password';

	wrapper.find('#email').simulate('change', {
		target: {
			name: 'email',
			value: email,
		},
	});
	wrapper.find('#password').simulate('change', {
		target: {
			name: 'password',
			value: password,
		},
	});
	wrapper.update();

	wrapper.find('form').simulate('submit', { preventDefault: () => undefined });
	expect(registerUser).toHaveBeenCalledTimes(1);
	expect(registerUser).toHaveBeenCalledWith({ email, password });
});
