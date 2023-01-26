import { Route, Routes } from 'react-router-dom';
import './App.css';
import './colors.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Home from './components/Home';
import RSVP from './components/RSVP';
import SignIn from './components/SignIn';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/rsvp' element={<RSVP />} />
				<Route path='/signin' element={<SignIn />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</>
	);
}

export default App;
