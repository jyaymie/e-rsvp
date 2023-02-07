import { FC, useContext } from 'react';
import { DataContext } from '../../dataContext';

const FoodInput: FC = () => {
	const { formState, setFormState, guest, setGuest } = useContext(DataContext);

	return (
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
						className={
							formState.isClickedForFoodRestrictions
								? 'button--hidden'
								: 'button'
						}
						type='button'
						value='Next'
						onClick={() =>
							setFormState({
								...formState,
								isClickedForFoodRestrictions: true,
							})
						}>
						NEXT
					</button>
				</>
			)}
		</>
	);
};

export default FoodInput;
