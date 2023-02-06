import { useContext, useEffect } from 'react';
import axios from 'axios';
import { DataContext, IGuest } from '../dataContext';
import EmailInput from './wizard/EmailInput';
import AttendanceInput from './wizard/AttendanceInput';
import HotelInput from './wizard/HotelInput';
import EntreeInput from './wizard/EntreeInput';
import FoodInput from './wizard/FoodInput';
import SongInput from './wizard/SongInput';

const RsvpForm: React.FC = () => {
	const { formState, setFormState, guest, setGuest } = useContext(DataContext);

	useEffect(() => {
		setFormState({
			isReturning: false,
			isFormHidden: false,
			isInputHidden: false,
			error: '',
			hasFoodRestrictions: null,
			isClickedForFoodRestrictions: false,
			isSubmitted: false,
		});
	}, []);

	const handleSubmit = async (e: React.FormEvent, guest: IGuest) => {
		e.preventDefault();
		if (!formState.hasFoodRestrictions) {
			setGuest({ ...guest, food_restrictions: '' });
		}
		if (guest.is_attending === 0) {
			setGuest({
				...guest,
				needs_hotel: null,
				entree: '',
				food_restrictions: '',
				song_request: '',
			});
		}
		const res = await axios.put(
			`http://localhost:3001/guests/${guest.guest_id}`,
			guest
		);
		if (res.status === 200) {
			setFormState({ ...formState, isFormHidden: true, isSubmitted: true });
		}
	};

	const handleClickToEdit = () => {
		if (guest.food_restrictions === '') {
			setFormState({
				...formState,
				isFormHidden: false,
				isInputHidden: true,
				hasFoodRestrictions: false,
				isSubmitted: false,
			});
		} else {
			setFormState({
				...formState,
				isFormHidden: false,
				isInputHidden: true,
				hasFoodRestrictions: true,
				isSubmitted: false,
			});
		}
	};

	return (
		<div className='rsvp component'>
			<form
				className={formState.isFormHidden ? 'form--hidden' : 'form'}
				onSubmit={(e) => handleSubmit(e, guest)}>
				<EmailInput />

				{/* If guest is in DB, display input fields re: attendance. Else, display error message. */}

				{guest.guest_id && <AttendanceInput />}

				{formState.error && <p>{formState.error}</p>}

				{/* If guest is attending, display input fields re: hotel. Else, enable Submit button. */}

				{guest.is_attending === 1 && <HotelInput />}

				{guest.is_attending === 0 && (
					<button type='submit' value='Submit' className='button'>
						SUBMIT
					</button>
				)}

				{/* Once guest provides response re: hotel, display input fields re: entree. */}

				{guest.is_attending === 1 && guest.needs_hotel !== null && (
					<EntreeInput />
				)}

				{/* Once guest provides response re: entree, display input fields re: food restrictions. */}

				{guest.is_attending === 1 && guest.entree && <FoodInput />}

				{/* If guest has no food restrictions or enters details re: food restrictions, display final input field re: song request. */}

				{guest.is_attending === 1 &&
					(formState.hasFoodRestrictions === false ||
						formState.isClickedForFoodRestrictions) && <SongInput />}
			</form>

			{guest.is_attending === 1 && formState.isSubmitted && (
				<>
					<p>Hooray, {guest.name}! We look forward to celebrating with you.</p>
					<p>
						Need to make changes? Click
						<button
							className='button'
							type='button'
							value='here'
							onClick={handleClickToEdit}>
							here
						</button>
						.
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
						<button
							className='button'
							type='button'
							value='here'
							onClick={handleClickToEdit}>
							here
						</button>
					</p>
				</>
			)}
		</div>
	);
};

export default RsvpForm;
