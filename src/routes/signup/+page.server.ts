import { signUp } from '$lib/userService';
import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';

const getFormData = z
	.object({
		email: z.string().email('Email is missing'),
		name: z.string().min(3, 'Username must be aleast 3 characters long'),
		password: z.string().min(6, 'Password must be at least 6 characters long'),
		confirmPassword: z.string()
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: "Passwords don't match"
			});
		}
	});

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		try {
			const formData = getFormData.parse({
				email: data.get('email'),
				name: data.get('username'),
				password: data.get('password'),
				confirmPassword: data.get('confirmPassword')
			});
			await signUp(formData);
		} catch (err) {
			if (err instanceof z.ZodError) {
				console.log(err.flatten());
				return {
					errors: err.flatten()
				};
			}
			return {
				backendError: {
					message: 'Email is already in use'
				}
			};
		}
	}
};
