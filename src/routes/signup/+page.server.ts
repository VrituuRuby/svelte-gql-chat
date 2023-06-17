import { signUp } from '$lib/auth.js';
import { error, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const email = data.get('mail')?.toString();
		const name = data.get('name')?.toString();
		const password = data.get('password')?.toString();
		const confirmPassword = data.get('confirmPassword')?.toString();

		if (!email) return fail(401, { email: data.get('mail'), error: 'Email is missing' });
		if (!name) return fail(401, { email: data.get('name'), error: 'Name is missing' });
		if (!password) return fail(401, { email: data.get('password'), error: 'password is missing' });

		if (password !== confirmPassword)
			return fail(401, {
				confirmPassword: data.get('confirmPassword'),
				error: 'Passwords must match'
			});

		try {
			await signUp({ email, name, password });
		} catch (err) {
			return fail(401, { error: 'Email is already in use' });
		}
	}
};
