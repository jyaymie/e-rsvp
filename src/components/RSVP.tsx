import { useState } from 'react';
import axios from 'axios';

interface IGuest {
	guest_id: string;
	name: string;
	email: string;
	is_attending: number;
	needs_hotel: number;
	entree: string;
	food_restrictions: string;
	song_request: string;
}

const RSVP: React.FC = () => {
	const [isHidden, setIsHidden] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [isAttending, setIsAttending] = useState<string>('');
	const [needsHotel, setNeedsHotel] = useState<string>('');
	const [hasFoodRestrictions, setHasFoodRestrictions] = useState<string>('');
	const [isClicked, setIsClicked] = useState<boolean>(false);

	const [guest, setGuest] = useState<IGuest>({
		guest_id: '',
		name: '',
		email: '',
		is_attending: 0,
		needs_hotel: 0,
		entree: '',
		food_restrictions: '',
		song_request: '',
	});

	// Confirm that guest has been added to DB by host.
	const confirmGuest = async (email: string) => {
		const res = await axios.get(`http://localhost:3001/guests?email=${email}`);
		if (res.data.rows.length) {
			setGuest(res.data.rows[0]);
			setIsHidden(!isHidden);
		} else {
			setError('Please check that your email is correct.');
		}
	};

	const handleAttendance = (attendance: string) => {
		setIsAttending(attendance);
		// With SQLite, Boolean values are stored as integers 0 (false) and 1 (true).
		setGuest({ ...guest, is_attending: isAttending === 'accepts' ? 1 : 0 });
	};

	const handleHotelRequest = (hotelRequest: string) => {
		setNeedsHotel(hotelRequest);
		// With SQLite, Boolean values are stored as integers 0 (false) and 1 (true).
		setGuest({ ...guest, needs_hotel: needsHotel === 'yes' ? 1 : 0 });
	};

	return (
		<div className='rsvp component'>
			<form className='form'>
				<div className={isHidden ? 'form__input--hidden' : ''}>
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

				{guest.guest_id && (
					<div>
						<p>Hi, {guest.name}!</p>
						<p>Will you be attending the wedding?</p>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='yesAttendance'
								name='attendance'
								value='Accepts'
								checked={isAttending === 'accepts'}
								onChange={() => handleAttendance('accepts')}
							/>
							<label htmlFor='yesAttendance'>Accepts</label>
						</div>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='noAttendance'
								name='attendance'
								value='Regrets'
								checked={isAttending === 'regrets'}
								onChange={() => handleAttendance('regrets')}
							/>
							<label htmlFor='noAttendance'>Regrets</label>
						</div>
					</div>
				)}

				{error && <p>{error}</p>}

				{/* If guest is attending, display input fields re: hotel. Else, enable Submit button. */}

				{isAttending === 'accepts' && (
					<>
						<p>Do you need hotel accommodations?</p>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='noHotelRequest'
								name='hotelRequest'
								value='No'
								checked={needsHotel === 'no'}
								onChange={() => handleHotelRequest('no')}
							/>
							<label htmlFor='noHotelRequest'>No</label>
						</div>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='yesHotelRequest'
								name='hotelRequest'
								value='Yes'
								checked={needsHotel === 'yes'}
								onChange={() => handleHotelRequest('yes')}
							/>
							<label htmlFor='yesHotelRequest'>Yes</label>
						</div>
					</>
				)}

				{isAttending === 'regrets' && (
					<button type='submit' value='Submit' className='button'>
						SUBMIT
					</button>
				)}

				{/* Once guest provides response re: hotel, display input fields re: entree. */}

				{isAttending === 'accepts' && needsHotel && (
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

				{isAttending === 'accepts' && guest.entree && (
					<>
						<p>Any allergies or dietary restrictions?</p>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='noFoodRestrictions'
								name='foodRestrictions'
								value='No'
								checked={hasFoodRestrictions === 'no'}
								onChange={() => setHasFoodRestrictions('no')}
							/>
							<label htmlFor='noFoodRestrictions'>No</label>
						</div>
						<div className='form__input--radio'>
							<input
								type='radio'
								id='yesFoodRestrictions'
								name='foodRestrictions'
								value='Yes'
								checked={hasFoodRestrictions === 'yes'}
								onChange={() => setHasFoodRestrictions('yes')}
							/>
							<label htmlFor='yesFoodRestrictions'>Yes</label>
						</div>
					</>
				)}

				{/* If there are food restrictions, display text area.*/}

				{isAttending === 'accepts' && hasFoodRestrictions === 'yes' && (
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
							className={isClicked ? 'button--hidden' : 'button'}
							type='button'
							value='Next'
							onClick={() => setIsClicked(!isClicked)}>
							NEXT
						</button>
					</>
				)}

				{/* If guest has no food restrictions or enters details re: food restrictions, display final input field re: song request. */}

				{isAttending === 'accepts' &&
					(hasFoodRestrictions === 'no' || isClicked) && (
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
		</div>
	);
};

export default RSVP;
