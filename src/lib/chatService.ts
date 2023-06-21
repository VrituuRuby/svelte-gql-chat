import { error } from '@sveltejs/kit';
import { GET_MESSAGES } from '../graphql/queries';
import { getClient } from './api';

interface MessagesData {
	userData: any;
}

export async function loadMessages(token: string) {
	try {
		getClient().setHeader('Authorization', `Berare ${token}`);
		const response = await getClient().request<MessagesData>(GET_MESSAGES);
		console.log(response);
		return response;
	} catch (err) {
		console.log(err);
	}
}
