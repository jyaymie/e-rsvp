import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
	return (
		<div className='component header'>
			<Link to='/' className='header__link'>
				e-RSVP
			</Link>
		</div>
	);
};

export default Header;
