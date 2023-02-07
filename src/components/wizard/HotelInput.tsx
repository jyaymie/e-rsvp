import { FC, useContext } from 'react';
import { DataContext } from '../../dataContext';

const HotelInput: FC = () => {
	const { guest, setGuest } = useContext(DataContext);

	return (
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
	);
};

export default HotelInput;
