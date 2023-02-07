import { FC, useEffect, useState } from 'react';
import { IGuest } from '../dataContext';
import axios from 'axios';

interface IDisplayState {
	addGuestForm: boolean;
	guestList: boolean;
}

const Dashboard: FC = () => {
	const [guests, setGuests] = useState<IGuest[]>([]);
	const [guest, setGuest] = useState<IGuest>({
		guest_id: null,
		name: '',
		email: '',
		is_attending: null,
		needs_hotel: null,
		entree: '',
		food_restrictions: '',
		song_request: '',
	});
	const [displayState, setDisplayState] = useState<IDisplayState>({
		addGuestForm: false,
		guestList: false,
	});
	const [email, setEmail] = useState<string>('');

	useEffect(() => {
		const getGuests = async () => {
			const res = await axios.get(`http://localhost:3001/guests`);
			if (res.status === 200) {
				setGuests(res.data.rows);
			}
		};
		getGuests();
	}, []);

	const addGuest = async (e: React.FormEvent, guestToAdd: IGuest) => {
		e.preventDefault();
		setGuest({ ...guest, guest_id: Date.now() });
		const res = await axios.post(`http://localhost:3001/guests`, guestToAdd);
		if (res.status === 201) {
			setGuests(res.data.rows);
			setGuest({
				guest_id: null,
				name: '',
				email: '',
				is_attending: null,
				needs_hotel: null,
				entree: '',
				food_restrictions: '',
				song_request: '',
			});
			setDisplayState({ ...displayState, addGuestForm: false });
		}
	};

	const deleteGuest = async (e: React.FormEvent, guestToDelete: IGuest) => {
		const res = await axios.delete(
			`http://localhost:3001/guests/${guestToDelete.guest_id}`
		);
		if (res.status === 200) {
			setGuests(res.data.rows);
		}
	};

	const completeEdit = async (guestToEdit: IGuest) => {
		const res = await axios.put(
			`http://localhost:3001/guests/${guestToEdit.guest_id}`,
			guestToEdit
		);
		if (res.status === 200) {
			setGuests(res.data.rows);
			setEmail('');
		}
	};

	const setCurrGuest = (currGuest: IGuest) => {
		setGuests(
			guests.map((guest) => {
				if (guest.guest_id === currGuest.guest_id) {
					return {
						...guest,
						...currGuest,
					};
				}
				return guest;
			})
		);
	};

	return (
		<div className='dashboard component'>
			<p>Happy planning, PB + J!</p>
			<button
				type='button'
				value='addGuest'
				onClick={() =>
					setDisplayState({
						...displayState,
						addGuestForm: !displayState.addGuestForm,
					})
				}>
				Add Guest
			</button>
			<form
				className={displayState.addGuestForm ? 'form' : 'form--hidden'}
				onSubmit={(e) => addGuest(e, guest)}>
				<input
					className='form__input'
					type='text'
					name='guestName'
					placeholder='Guest Name'
					value={guest.name}
					onChange={(e) => setGuest({ ...guest, name: e.target.value })}
					required
				/>
				<input
					className='form__input'
					type='text'
					name='guestEmail'
					placeholder='Guest Email'
					value={guest.email}
					onChange={(e) => setGuest({ ...guest, email: e.target.value })}
					required
				/>
				<button className='button' type='submit' value='Submit'>
					ADD
				</button>
				<button
					className='button'
					type='button'
					onClick={() =>
						setDisplayState({ ...displayState, addGuestForm: false })
					}>
					CANCEL
				</button>
			</form>

			<button
				type='button'
				value='clickForGuestList'
				onClick={() =>
					setDisplayState({
						...displayState,
						guestList: !displayState.guestList,
					})
				}>
				{displayState.guestList ? 'Hide Guest List' : 'View Guest List'}
			</button>

			{guests &&
				displayState.guestList &&
				guests.map((currGuest) => (
					<div key={currGuest.guest_id}>
						{email === currGuest.email ? (
							<div>
								<input
									type='text'
									placeholder={currGuest.name}
									value={currGuest.name}
									onChange={(e) =>
										setCurrGuest({ ...currGuest, name: e.target.value })
									}
								/>
								<input
									type='text'
									placeholder={currGuest.email}
									value={currGuest.email}
									onChange={(e) =>
										setCurrGuest({ ...currGuest, email: e.target.value })
									}
								/>
								<button
									type='button'
									value='cancel'
									onClick={() => setEmail('')}>
									Cancel
								</button>
								<button
									type='button'
									value='completeEdit'
									onClick={() => completeEdit(currGuest)}>
									Complete Edit
								</button>
							</div>
						) : (
							<div>
								<p>{currGuest.name}</p>
								<p>{currGuest.email}</p>
								<button
									type='button'
									value='editGuest'
									onClick={() => setEmail(currGuest.email)}>
									Edit Guest
								</button>
								<button
									type='button'
									value='deleteGuest'
									onClick={(e) => deleteGuest(e, currGuest)}>
									Delete Guest
								</button>
							</div>
						)}
					</div>
				))}
		</div>
	);
};

export default Dashboard;
