import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (password === process.env.REACT_APP_PASSWORD) {
			navigate('/rsvp');
		}
	};

	return (
		<div className='home component'>
			<p>
				You're invited to{' '}
				<span className='home__text--highlighted'>PB + J's Wedding</span>!
			</p>

			<form className='form' onSubmit={(e) => handleSubmit(e)}>
				<input
					type='password'
					name='password'
					autoComplete='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type='submit' value='Submit' className='button--submit'>
					Submit
				</button>
			</form>
			<p>
				If you're the host, please <Link to='/signin'>sign in</Link>.
			</p>
		</div>
	);
};

export default Home;
