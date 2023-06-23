import { GET_MESSAGES } from '../graphql/queries';
import { client } from './api';

interface IUser {
	createdAt: Date;
	email: string;
	id: number;
	name: string;
	rooms: IRoom[];
}

export interface IRoom {
	name: string;
	id: number;
	messages: IMessage[];
}

export interface IMessage {
	text: string;
	createdAt: Date;
	user: {
		name: string;
		id: number;
	};
}
interface Data {
	user: IUser;
}

export async function loadMessages() {
	try {
		const response = await client.request<Data>(GET_MESSAGES);
		return response;
	} catch (err) {
		throw Error('Expired session');
	}
}
