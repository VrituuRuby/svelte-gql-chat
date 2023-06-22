import { GET_MESSAGES } from '../graphql/queries';
import { client } from './api';

interface IUser {
	createdAt: Date;
	email: string;
	id: 1;
	name: string;
	rooms: IRoom[];
}

export interface IRoom {
	name: string;
	id: number;
	message: {
		text: string;
		createdAt: Date;
		user: {
			name: string;
		};
	};
}
interface MessagesData {
	user: IUser;
}

export async function loadMessages() {
	try {
		const response = await client.request<MessagesData>(GET_MESSAGES);
		return response;
	} catch (err) {
		throw Error('Expired session');
	}
}
