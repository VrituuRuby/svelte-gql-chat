import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ACCESS_TOKEN_KEY } from '$lib/userService';
import { loadMessages } from '$lib/chatService';

export const load: PageServerLoad = ({ cookies, request }) => {
	const isUserLogged = cookies.get(ACCESS_TOKEN_KEY);
	if (!isUserLogged) {
		throw redirect(301, '/login');
	}

	try {
		loadMessages(isUserLogged);
	} catch {
		throw redirect(301, '/login');
	}
};
