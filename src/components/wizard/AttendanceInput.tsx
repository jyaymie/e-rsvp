import { FC, useContext } from 'react';
import { DataContext } from '../../dataContext';

const AttendanceInput: FC = () => {
	const { guest, setGuest } = useContext(DataContext);

	return (
		<>
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
		</>
	);
};

export default AttendanceInput;
