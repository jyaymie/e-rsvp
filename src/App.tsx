import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './colors.css';
import Dashboard from './components/Dashboard';
import EditRSVP from './components/EditRSVP';
import Header from './components/Header';
import Home from './components/Home';
import RsvpForm from './components/RsvpForm';
import SignIn from './components/SignIn';

import { DataContext, IFormState, IGuest } from './dataContext';

function App() {
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

	return (
		<DataContext.Provider value={{ formState, setFormState, guest, setGuest }}>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/edit-rsvp/:guestId' element={<EditRSVP />} />
				<Route path='/rsvp' element={<RsvpForm />} />
				<Route path='/signin' element={<SignIn />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</DataContext.Provider>
	);
}

export default App;
