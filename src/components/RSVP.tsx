import { useState } from 'react';

const RSVP: React.FC = () => {
	const [guest, setGuest] = useState<string>('');
	const [foodExceptions, setFoodExceptions] = useState<string>('');
	const [song, setSong] = useState<string>('');

	return (
		<div className='rsvp component'>
			<form className='form'>
				<input
					type='text'
					name='guest'
					placeholder='Guest'
					value={guest}
					onChange={(e) => setGuest(e.target.value)}
					required
				/>

				{/* If guest is on the guest list, display the next input fields.
        Else, display "Please enter the name on your Save the Date." */}

				<div className='form__input-radio'>
					<input
						type='radio'
						id='yesAttendance'
						name='attendance'
						value='Accepts'
						required
					/>
					<label htmlFor='yesAttendance'>Accepts</label>
				</div>

				<div className='form__input-radio'>
					<input
						type='radio'
						id='noAttendance'
						name='attendance'
						value='Regrets'
						required
					/>
					<label htmlFor='noAttendance'>Regrets</label>
				</div>

				{/* If guest is attending, display the next input fields.
        Else, enable Submit button. */}

				<p>Please select your entree:</p>
				<div className='form__input-radio'>
					<input type='radio' id='beef' name='entree' value='Beef' required />
					<label htmlFor='beef'>Beef</label>
				</div>

				<div className='form__input-radio'>
					<input
						type='radio'
						id='chicken'
						name='entree'
						value='Chicken'
						required
					/>
					<label htmlFor='chicken'>Chicken</label>
				</div>

				<div className='form__input-radio'>
					<input type='radio' id='fish' name='entree' value='Fish' required />
					<label htmlFor='fish'>Fish</label>
				</div>

				<div className='form__input-radio'>
					<input
						type='radio'
						id='vegetarian'
						name='entree'
						value='Vegetarian'
						required
					/>
					<label htmlFor='vegetarian'>Vegetarian</label>
				</div>

				<p>Any allergies or dietary restrictions?</p>
				<div className='form__input-radio'>
					<input
						type='radio'
						id='noFoodExceptions'
						name='foodExceptions'
						value='No'
						required
					/>
					<label htmlFor='noFoodExceptions'>No</label>
				</div>

				<div className='form__input-radio'>
					<input
						type='radio'
						id='yesFoodExceptions'
						name='foodExceptions'
						value='Yes'
						required
					/>
					<label htmlFor='yesFoodExceptions'>Yes</label>
				</div>

				{/* If there are food exceptions, display the text area.
        Else, display the final input field. */}

				<textarea
					name='foodExceptions'
					value={foodExceptions}
					onChange={(e) => setFoodExceptions(e.target.value)}
					className='form__input-textarea'
				/>
				{/* Enable the button when guest types in the text area. */}
				<button type='button' disabled={!foodExceptions}>
					Almost there!
				</button>

				<p>{`Song Request (Optional)`}</p>
				<textarea
					name='song'
					value={song}
					onChange={(e) => setSong(e.target.value)}
					className='form__input-textarea'
				/>

				<button type='submit' value='Submit'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default RSVP;
