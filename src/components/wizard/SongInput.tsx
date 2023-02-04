import { useContext } from 'react';
import { DataContext } from '../../dataContext';

const SongInput: React.FC = () => {
	const { guest, setGuest } = useContext(DataContext);

	return (
		<>
			<p>{'Song Request (Optional)'}</p>
			<textarea
				className='form__input--textarea'
				name='song'
				value={guest.song_request}
				onChange={(e) => setGuest({ ...guest, song_request: e.target.value })}
			/>
			<button type='submit' value='Submit' className='button'>
				SUBMIT
			</button>
		</>
	);
};

export default SongInput;
