import { FC, useContext } from 'react';
import { DataContext } from '../../dataContext';
import axios from 'axios';

const EmailInput: FC = () => {
	const { formState, setFormState, guest, setGuest } = useContext(DataContext);

	// Confirm that guest has been added to DB by host.
	const confirmGuest = async (email: string) => {
		const res = await axios.get(`http://localhost:3001/guests?email=${email}`);
		// If guest in is DB:
		if (res.data.rows.length) {
			setGuest(res.data.rows[0]);
			// If guest has already RSVPed:
			if (res.data.rows[0].is_attending !== null) {
				setFormState({
					...formState,
					isReturning: true,
					isFormHidden: true,
					error: '',
					isClickedForFoodRestrictions: true,
					isSubmitted: true,
				});
			} else {
				setFormState({ ...formState, isInputHidden: true, error: '' });
			}
		} else {
			setFormState({
				...formState,
				error: 'Please check that your email is correct.',
			});
		}
	};

	return (
		<div className={formState.isInputHidden ? 'form__input--hidden' : ''}>
			<p>Please enter your email:</p>
			<div className='form__input--display-flex'>
				<input
					className='form__input'
					type='text'
					name='email'
					value={guest.email}
					onChange={(e) => setGuest({ ...guest, email: e.target.value })}
					required
				/>
				<button
					className='button'
					type='button'
					value='Next'
					onClick={() => confirmGuest(guest.email)}>
					NEXT
				</button>
			</div>
		</div>
	);
};

export default EmailInput;
