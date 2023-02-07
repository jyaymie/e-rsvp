import { FC, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../dataContext';
import './Home.css';

const Home: FC = () => {
	const { setFormState, setGuest } = useContext(DataContext);

	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (password === process.env.REACT_APP_SITE_PASS) {
			setFormState({
				isReturning: false,
				isFormHidden: false,
				isInputHidden: false,
				error: '',
				hasFoodRestrictions: null,
				isClickedForFoodRestrictions: false,
				isSubmitted: false,
			});
			setGuest({
				guest_id: null,
				name: '',
				email: '',
				is_attending: null,
				needs_hotel: null,
				entree: '',
				food_restrictions: '',
				song_request: '',
			});
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
