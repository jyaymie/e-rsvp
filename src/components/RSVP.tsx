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
	const [error, setError] = useState<string>('');
	const [isAttending, setIsAttending] = useState<string>('');
	const [needsHotel, setNeedsHotel] = useState<string>('');
	const [hasFoodRestrictions, setHasFoodRestrictions] = useState<string>('');

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

	const confirmGuest = async (email: string) => {
		const res = await axios.get(`http://localhost:3001/guests?email=${email}`);
		if (res.data.rows.length) {
			setGuest(res.data.rows[0]);
		} else {
			setError('Please check that your email is correct.');
		}
	};

	const handleAttendance = (attendance: string) => {
		setIsAttending(attendance);
		setGuest({ ...guest, is_attending: isAttending === 'accepts' ? 1 : 0 });
	};

	const handleHotelRequest = (hotelRequest: string) => {
		setNeedsHotel(hotelRequest);
		setGuest({ ...guest, needs_hotel: needsHotel === 'yes' ? 1 : 0 });
	};

	return (
		<div className='rsvp component'>
			<form className='form'>
				<p>Please enter your email:</p>
				<input
					type='text'
					name='email'
					value={guest.email}
					onChange={(e) => setGuest({ ...guest, email: e.target.value })}
					required
				/>
				<button
					type='button'
					value='Next'
					onClick={() => confirmGuest(guest.email)}>
					NEXT
				</button>

				{/* If guest is on the guest list, display input fields. Else, display error message. */}

				{guest.guest_id && (
					<div>
						<div className='form__input-radio'>
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
						<div className='form__input-radio'>
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

				{/* If guest is attending, display input fields. Else, enable Submit button. */}

				{isAttending === 'accepts' && (
					<>
						<p>Do you need hotel accommodations?</p>
						<div className='form__input-radio'>
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
						<div className='form__input-radio'>
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

						<p>Please select your entree:</p>
						<div className='form__input-radio'>
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
						<div className='form__input-radio'>
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
						<div className='form__input-radio'>
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
						<div className='form__input-radio'>
							<input
								type='radio'
								id='vegetarian'
								name='entree'
								checked={guest.entree === 'vegetarian'}
								onChange={() => setGuest({ ...guest, entree: 'vegetarian' })}
							/>
							<label htmlFor='vegetarian'>Vegetarian</label>
						</div>
						<p>Any allergies or dietary restrictions?</p>
						<div className='form__input-radio'>
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
						<div className='form__input-radio'>
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

						{/* If there are food restrictions, display text area.*/}

						{hasFoodRestrictions === 'yes' && (
							<textarea
								name='foodRestrictions'
								value={guest.food_restrictions}
								onChange={(e) =>
									setGuest({ ...guest, food_restrictions: e.target.value })
								}
								className='form__input-textarea'
								required
							/>
						)}

						<p>{'Song Request (Optional)'}</p>
						<textarea
							name='song'
							value={guest.song_request}
							onChange={(e) =>
								setGuest({ ...guest, song_request: e.target.value })
							}
							className='form__input-textarea'
						/>

						<button type='submit' value='Submit'>
							SUBMIT
						</button>
					</>
				)}

				{isAttending === 'regrets' && (
					<button type='submit' value='Submit'>
						SUBMIT
					</button>
				)}
        
			</form>
		</div>
	);
};

export default RSVP;
