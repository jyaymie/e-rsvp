import { createContext, Dispatch, SetStateAction } from 'react';

export interface IFormState {
	isReturning: boolean;
	isFormHidden: boolean;
	isInputHidden: boolean;
	error: string;
	hasFoodRestrictions: boolean | null;
	isClickedForFoodRestrictions: boolean;
	isSubmitted: boolean;
}

// With SQLite, Boolean values are stored as integers 0 (false) and 1 (true).

export interface IGuest {
	guest_id: string;
	name: string;
	email: string;
	is_attending: number | null;
	needs_hotel: number | null;
	entree: string;
	food_restrictions: string;
	song_request: string;
}

export const DataContext = createContext<{
	guest: IGuest;
	setGuest: Dispatch<SetStateAction<IGuest>>;
	formState: IFormState;
	setFormState: Dispatch<SetStateAction<IFormState>>;
}>({
	formState: {
		isReturning: false,
		isFormHidden: false,
		isInputHidden: false,
		error: '',
		hasFoodRestrictions: null,
		isClickedForFoodRestrictions: false,
		isSubmitted: false,
	},
	setFormState: () => {},
	guest: {
		guest_id: '',
		name: '',
		email: '',
		is_attending: null,
		needs_hotel: null,
		entree: '',
		food_restrictions: '',
		song_request: '',
	},
	setGuest: () => {},
});
