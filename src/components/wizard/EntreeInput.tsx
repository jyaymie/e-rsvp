import { useContext } from 'react';
import { DataContext } from '../../dataContext';

const EntreeInput: React.FC = () => {
	const { guest, setGuest } = useContext(DataContext);

	return (
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
	);
};

export default EntreeInput;
