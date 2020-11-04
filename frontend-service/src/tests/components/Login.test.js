import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../components/Login';

it('should render login page correctly', () => {
	const wrapper = shallow(<Login />);
	expect(wrapper).toMatchSnapshot();
});

it('form changes user state correctly', () => {
	const wrapper = shallow(<Login />);

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

it('should handle logging in user correctly', () => {
	const loginUser = jest.fn();
	const wrapper = shallow(<Login loginUser={loginUser} />);

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
	expect(loginUser).toBeCalledTimes(1);
	expect(loginUser.mock.calls[0][0]).toEqual({ email, password });
});
