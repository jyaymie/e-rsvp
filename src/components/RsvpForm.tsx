import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DataContext, IGuest } from '../dataContext';
import EmailInput from './wizard/EmailInput';
import AttendanceInput from './wizard/AttendanceInput';
import HotelInput from './wizard/HotelInput';
import EntreeInput from './wizard/EntreeInput';
import RestrictionsInput from './wizard/RestrictionsInput';
import SongInput from './wizard/SongInput';

const RsvpForm: React.FC = () => {
	const { formState, setFormState, guest } = useContext(DataContext);

	useEffect(() => {
		setFormState({
			isReturning: false,
			isFormHidden: false,
			isInputHidden: false,
			error: '',
			hasFoodRestrictions: null,
			isClicked: false,
			isSubmitted: false,
		});
	}, []);

	const handleSubmit = async (e: React.FormEvent, guest: IGuest) => {
		e.preventDefault();
		const res = await axios.put(
			`http://localhost:3001/guests/${guest.guest_id}`,
			guest
		);
		if (res.status === 200) {
			setFormState({ ...formState, isFormHidden: true, isSubmitted: true });
		}
	};

	return (
		<div className='rsvp component'>
			<form
				className={formState.isFormHidden ? 'form--hidden' : 'form'}
				onSubmit={(e) => handleSubmit(e, guest)}>
				<EmailInput />

				{/* If guest is in DB, display input fields re: attendance. Else, display error message. */}

				{guest.guest_id && !formState.isReturning && <AttendanceInput />}

				{formState.error && <p>{formState.error}</p>}

				{/* If guest is attending, display input fields re: hotel. Else, enable Submit button. */}

				{guest.is_attending === 1 && <HotelInput />}

				{guest.is_attending === 0 && !formState.isReturning && (
					<button type='submit' value='Submit' className='button'>
						SUBMIT
					</button>
				)}

				{/* Once guest provides response re: hotel, display input fields re: entree. */}

				{guest.is_attending === 1 && guest.needs_hotel !== null && (
					<EntreeInput />
				)}

				{/* Once guest provides response re: entree, display input fields re: food restrictions. */}

				{guest.is_attending === 1 && guest.entree && <RestrictionsInput />}

				{/* If guest has no food restrictions or enters details re: food restrictions, display final input field re: song request. */}

				{guest.is_attending === 1 &&
					(formState.hasFoodRestrictions === false || formState.isClicked) && (
						<SongInput />
					)}
			</form>

			{guest.is_attending === 1 && formState.isSubmitted && (
				<>
					<p>Hooray, {guest.name}! We look forward to celebrating with you.</p>
					<p>
						Need to make changes? Click
						<Link to={'/edit-rsvp/' + guest.guest_id}>here</Link>.
					</p>
				</>
			)}

			{guest.is_attending === 0 && formState.isSubmitted && (
				<>
					<p>
						Thanks, {guest.name}. It's a bummer you won't be with us, but we
						appreciate your response!
					</p>
					<p>
						Need to make changes? Click{' '}
						<Link to={'/edit-rsvp/' + guest.guest_id}>here</Link>.
					</p>
				</>
			)}
		</div>
	);
};

export default RsvpForm;
