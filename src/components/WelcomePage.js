import React, { Component } from 'react';

export default class WelcomePage extends Component {
	render() {
		return (
			<div>
				<h1>The Time is Now for You To Take Back Control From Your Planner</h1>
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
