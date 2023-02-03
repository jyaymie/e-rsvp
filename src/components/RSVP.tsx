import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface IFormState {
	isReturning: boolean;
	isFormHidden: boolean;
	isInputHidden: boolean;
	error: string;
	hasFoodRestrictions: boolean | null;
	isClicked: boolean;
	isSubmitted: boolean;
}

// With SQLite, Boolean values are stored as integers 0 (false) and 1 (true).
interface IGuest {
	guest_id: string;
	name: string;
	email: string;
	is_attending: number | null;
	needs_hotel: number | null;
	entree: string;
	food_restrictions: string;
	song_request: string;
}

const RSVP: React.FC = () => {
	const [formState, setFormState] = useState<IFormState>({
		isReturning: false,
		isFormHidden: false,
		isInputHidden: false,
		error: '',
		hasFoodRestrictions: null,
		isClicked: false,
		isSubmitted: false,
	});

	const [guest, setGuest] = useState<IGuest>({
		guest_id: '',
		name: '',
		email: '',
		is_attending: null,
		needs_hotel: null,
		entree: '',
		food_restrictions: '',
		song_request: '',
	});

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

	// Confirm that guest has been added to DB by host.
	const confirmGuest = async (email: string) => {
		const res = await axios.get(`http://localhost:3001/guests?email=${email}`);
		if (res.data.rows.length && res.data.rows[0].is_attending !== null) {
			// If guest is in DB and has already RSVPed:
			setGuest(res.data.rows[0]);
			setFormState({
				...formState,
				isReturning: true,
				isFormHidden: true,
				isSubmitted: true,
			});
		} else if (res.data.rows.length) {
			// Else if guest is in DB but has not RSVPed:
			setGuest(res.data.rows[0]);
			setFormState({ ...formState, isInputHidden: true });
		} else {
			setFormState({
				...formState,
				error: 'Please check that your email is correct.',
			});
		}
	};

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

				{/* If guest is in DB, display input fields re: attendance. Else, display error message. */}

				{guest.guest_id && !formState.isReturning && (
					<div>
						<p>Hi, {guest.name}!</p>
						<p>Will you be attending the wedding?</p>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='yesAttendance'
								name='attendance'
								value='Accepts'
								checked={guest.is_attending === 1}
								onChange={() => setGuest({ ...guest, is_attending: 1 })}
							/>
							<label htmlFor='yesAttendance'>Accepts</label>
						</div>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='noAttendance'
								name='attendance'
								value='Regrets'
								checked={guest.is_attending === 0}
								onChange={() => setGuest({ ...guest, is_attending: 0 })}
							/>
							<label htmlFor='noAttendance'>Regrets</label>
						</div>
					</div>
				)}

				{formState.error && <p>{formState.error}</p>}

				{/* If guest is attending, display input fields re: hotel. Else, enable Submit button. */}

				{guest.is_attending === 1 && (
					<>
						<p>Do you need hotel accommodations?</p>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='noHotelRequest'
								name='hotelRequest'
								value='No'
								checked={guest.needs_hotel === 0}
								onChange={() => setGuest({ ...guest, needs_hotel: 0 })}
							/>
							<label htmlFor='noHotelRequest'>No</label>
						</div>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='yesHotelRequest'
								name='hotelRequest'
								value='Yes'
								checked={guest.needs_hotel === 1}
								onChange={() => setGuest({ ...guest, needs_hotel: 1 })}
							/>
							<label htmlFor='yesHotelRequest'>Yes</label>
						</div>
					</>
				)}

				{guest.is_attending === 0 && !formState.isReturning && (
					<button type='submit' value='Submit' className='button'>
						SUBMIT
					</button>
				)}

				{/* Once guest provides response re: hotel, display input fields re: entree. */}

				{guest.is_attending === 1 && guest.needs_hotel !== null && (
					<>
						<p>Please select your entree:</p>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='beef'
								name='entree'
								value='Beef'
								checked={guest.entree === 'beef'}
								onChange={() => setGuest({ ...guest, entree: 'beef' })}
							/>
							<label htmlFor='beef'>Beef</label>
						</div>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='chicken'
								name='entree'
								value='Chicken'
								checked={guest.entree === 'chicken'}
								onChange={() => setGuest({ ...guest, entree: 'chicken' })}
							/>
							<label htmlFor='chicken'>Chicken</label>
						</div>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='fish'
								name='entree'
								value='Fish'
								checked={guest.entree === 'fish'}
								onChange={() => setGuest({ ...guest, entree: 'fish' })}
							/>
							<label htmlFor='fish'>Fish</label>
						</div>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='vegetarian'
								name='entree'
								checked={guest.entree === 'vegetarian'}
								onChange={() => setGuest({ ...guest, entree: 'vegetarian' })}
							/>
							<label htmlFor='vegetarian'>Vegetarian</label>
						</div>
					</>
				)}

				{/* Once guest provides response re: entree, display input fields re: food restrictions. */}

				{guest.is_attending === 1 && guest.entree && (
					<>
						<p>Any allergies or dietary restrictions?</p>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='noFoodRestrictions'
								name='foodRestrictions'
								value='No'
								checked={formState.hasFoodRestrictions === false}
								onChange={() =>
									setFormState({ ...formState, hasFoodRestrictions: false })
								}
							/>
							<label htmlFor='noFoodRestrictions'>No</label>
						</div>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='yesFoodRestrictions'
								name='foodRestrictions'
								value='Yes'
								checked={formState.hasFoodRestrictions === true}
								onChange={() =>
									setFormState({ ...formState, hasFoodRestrictions: true })
								}
							/>
							<label htmlFor='yesFoodRestrictions'>Yes</label>
						</div>
					</>
				)}

				{/* If there are food restrictions, display text area.*/}

				{guest.is_attending === 1 && formState.hasFoodRestrictions && (
					<>
						<textarea
							className='form__input--textarea'
							name='foodRestrictions'
							value={guest.food_restrictions}
							onChange={(e) =>
								setGuest({ ...guest, food_restrictions: e.target.value })
							}
							required
						/>
						<button
							className={formState.isClicked ? 'button--hidden' : 'button'}
							type='button'
							value='Next'
							onClick={() => setFormState({ ...formState, isClicked: true })}>
							NEXT
						</button>
					</>
				)}

				{/* If guest has no food restrictions or enters details re: food restrictions, display final input field re: song request. */}

				{guest.is_attending === 1 &&
					(formState.hasFoodRestrictions === false || formState.isClicked) && (
						<>
							<p>{'Song Request (Optional)'}</p>
							<textarea
								className='form__input--textarea'
								name='song'
								value={guest.song_request}
								onChange={(e) =>
									setGuest({ ...guest, song_request: e.target.value })
								}
							/>
							<button type='submit' value='Submit' className='button'>
								SUBMIT
							</button>
						</>
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

export default RSVP;
