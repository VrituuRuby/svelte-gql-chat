import { ACCESS_TOKEN_KEY, signIn } from '$lib/userService';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

export const load: PageServerLoad = (event) => {
	const isUserLogged = event.cookies.get(ACCESS_TOKEN_KEY);
	if (isUserLogged) {
		throw redirect(301, '/app');
	}
};

const getFormData = z.object({
	email: z.string().email('Email is missing'),
	password: z.string()
});

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		try {
			const formData = getFormData.parse({
				email: data.get('email'),
				password: data.get('password')
			});
			const token = await signIn(formData);

			cookies.set(ACCESS_TOKEN_KEY, token, { maxAge: 60 * 24 });
		} catch (err) {
			if (err instanceof z.ZodError) {
				return {
					errors: err.flatten()
				};
			}
			return {
				backendError: {
					message: 'Invalid credentials'
				}
			};
		}
	}
};
