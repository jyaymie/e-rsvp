import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../dataContext';

interface IHost {
	username: string;
	password: string;
}

const SignIn: FC = () => {
	const { formState, setFormState } = useContext(DataContext);

	const [host, setHost] = useState<IHost>({ username: '', password: '' });
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (
			host.username === process.env.REACT_APP_HOST_NAME &&
			host.password === process.env.REACT_APP_HOST_PASS
		) {
			setFormState({ ...formState, error: '' });
			navigate('/dashboard');
		} else {
			setFormState({ ...formState, error: 'Please try again.' });
		}
	};

	return (
		<div className='signin component'>
			<form className='form' onSubmit={(e) => handleSubmit(e)}>
				<input
					type='text'
					name='username'
					autoComplete='username'
					placeholder='Username'
					value={host.username}
					onChange={(e) => setHost({ ...host, username: e.target.value })}
					required
				/>
				<input
					type='password'
					name='password'
					autoComplete='password'
					placeholder='Password'
					value={host.password}
					onChange={(e) => setHost({ ...host, password: e.target.value })}
					required
				/>
				<button type='submit' value='Submit' className='button--submit'>
					Submit
				</button>
			</form>

			{formState.error && <p>{formState.error}</p>}
		</div>
	);
};

export default SignIn;
