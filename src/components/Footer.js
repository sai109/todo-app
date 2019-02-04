import React from 'react';
import moment from 'moment';

export default () => {
	return (
		<footer>
			<h3>&copy;AspieCoder {moment().year()}, all rights reserved</h3>
		</footer>
	);
};
