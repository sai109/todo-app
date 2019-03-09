import React, { Component } from 'react';

export default class WelcomePage extends Component {
	render() {
		return (
			<div>
				<h1>Time To Take Back Control</h1>
				<button>
					<a href="/login">Login</a>
				</button>
				<button>
					<a href="/register">Register</a>
				</button>
			</div>
		);
	}
}
