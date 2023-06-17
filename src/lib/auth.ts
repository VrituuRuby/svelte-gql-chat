import { fail, error } from '@sveltejs/kit';
import { GET_USERS, SIGN_IN, SIGN_UP } from '../graphql/queries';
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

interface AuthResponse {
	signIn: {
		token: string;
	};
}
interface SignUpData {
	createUser: {
		id: number;
		name: string;
		createdAt: Date;
		permissions: string[];
	};
}
export async function signIn({ email, password }: signInDTO) {
	const response = await client.request<AuthResponse>(SIGN_IN, { data: { email, password } });
	const { token } = response.signIn;
	console.log(token);

	localStorage.setItem('@svelte-chat:access-token', token);
	client.setHeaders({ authorization: `Bearer ${token}` });
}

export async function signUp({ email, name, password }: signUpDTO) {
	try {
		const response = await client.request<SignUpData>(SIGN_UP, { data: { email, name, password } });
	} catch (err) {
		throw error(403, {
			message: 'Email is already in use'
		});
	}
}
