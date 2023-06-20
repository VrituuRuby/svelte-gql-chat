import { error } from '@sveltejs/kit';
import { SIGN_IN, SIGN_UP } from '../graphql/queries';
import { client } from './api';

interface signInDTO {
	email: string;
	password: string;
}
interface signUpDTO {
	email: string;
	name: string;
	password: string;
}

interface SignInData {
	signIn: {
		token: string;
	};
}
interface SignUpData {
	createUser: {
		id: number;
		name: string;
		createdAt: Date;
	};
}
interface SignUpBackendError {
	backendError: {
		message: string;
	};
}
export async function signIn({ email, password }: signInDTO): Promise<string> {
	try {
		const response = await client.request<SignInData>(SIGN_IN, { data: { email, password } });
		const { token } = response.signIn;

		localStorage.setItem('@svelte-chat:access-token', token);
		client.setHeaders({ authorization: `Bearer ${token}` });

		return token;
	} catch (err) {
		throw error(403, {
			message: 'Wrong email or password'
		});
	}
}

export async function signUp({
	email,
	name,
	password
}: signUpDTO): Promise<SignUpData | SignUpBackendError> {
	try {
		return await client.request<SignUpData>(SIGN_UP, { data: { email, name, password } });
	} catch (err) {
		throw new Error('Email is already in use');
	}
}
