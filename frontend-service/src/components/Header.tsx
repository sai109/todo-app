import React from 'react';
import headerStyles from '../styles/components/header.module.scss';

const Header: React.FC<{}> = () => (
	<div>
		<div>
			<h2 className={headerStyles.title}>
				TodoApp - Manage your Todos in peace
			</h2>
		</div>
	</div>
);

export default Header;
