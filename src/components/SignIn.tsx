import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IHost {
	username: string;
	password: string;
}

const SignIn: React.FC = () => {
	const [host, setHost] = useState<IHost>({ username: '', password: '' });
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		navigate('/dashboard');
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
		</div>
	);
};

export default SignIn;
