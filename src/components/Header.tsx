import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: FC = () => {
	return (
		<div className='component header'>
			<Link to='/' className='header__link'>
				e-RSVP
			</Link>
		</div>
	);
};

export default Header;
