import * as React from 'react';
import moment from 'moment';

const Footer: React.FC<{}> = () => {
	return (
		<div className="footer">
			<h3>&copy;AspieCoder {moment().year()}, all rights reserved</h3>
		</div>
	);
};

export default Footer;
