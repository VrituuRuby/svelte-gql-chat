<script lang="ts">
	import { goto } from '$app/navigation';
	import { signUp } from '$lib/userService';
	import { responsePathAsArray } from 'graphql';
	import { ZodError, z, type typeToFlattenedError } from 'zod';

	let email = '';
	let name = '';
	let password = '';
	let confirmPassword = '';
	let error: typeToFlattenedError<any>;
	let backendError: Error;

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

	async function handleSubmit() {
		try {
			const formData = getFormData.parse({ email, name, password, confirmPassword });
			const response = await signUp(formData);
			goto('/login');
		} catch (err) {
			if (err instanceof z.ZodError) {
				error = err.flatten();
			} else if (err instanceof Error) {
				backendError = err;
			}
		}
	}
</script>

<svelte:head>
	<title>Sign Up to ChatGQL</title>
</svelte:head>

<form
	on:submit|preventDefault={handleSubmit}
	class="w-full max-w-[500px] flex flex-col gap-2 bg-gray-100 p-6 justify-center items-center font-[Roboto] rounded-md drop-shadow-lg text-sm"
>
	<img src="/images/logo.svg" alt="" />
	<h1 class="font-rubik text-lg font-bold">Sign up to GQL Chat</h1>
	<label class="flex flex-col font-rubik font-semibold text-gray-500">
		Email
		<input
			type="email"
			bind:value={email}
			name="email"
			placeholder="Email"
			class="text-base font-roboto py-1.5 px-3 rounded-full bg-gray-50 shadow-neu-inner font-normal text-black focus:outline-light-purple"
		/>
		{#if error?.fieldErrors.email}
			<p class="text-sm font-normal text-red-600">{error?.fieldErrors.email}</p>
		{:else if backendError}
			<p class="text-sm font-normal text-red-600">{backendError.message}</p>
		{/if}
	</label>
	<label class="flex flex-col font-rubik font-semibold text-gray-500">
		User
		<input
			type="text"
			bind:value={name}
			name="username"
			placeholder="Username"
			class="text-base font-roboto py-1.5 px-3 rounded-full bg-gray-50 shadow-neu-inner font-normal text-black focus:outline-[#BBA6F8]"
		/>
		{#if error?.fieldErrors.name}
			<p class="text-sm font-normal text-red-600">{error?.fieldErrors.name}</p>
		{/if}
	</label>

	<label class="flex flex-col font-rubik font-semibold text-gray-500">
		Password
		<input
			bind:value={password}
			name="password"
			type="password"
			placeholder="Password"
			class="text-base font-roboto py-1.5 px-3 rounded-full bg-gray-50 shadow-neu-inner font-normal text-black focus:outline-[#BBA6F8]"
		/>
		{#if error?.fieldErrors.password}
			<p class="text-sm font-normal text-red-600">{error?.fieldErrors.password}</p>
		{/if}
	</label>

	<label class="flex flex-col font-rubik font-semibold text-gray-500">
		Confirm Password
		<input
			bind:value={confirmPassword}
			name="confirmPassword"
			type="password"
			placeholder="Password"
			class="text-base font-roboto py-1.5 px-3 rounded-full bg-gray-50 shadow-neu-inner font-normal text-black focus:outline-[#BBA6F8]"
		/>
		{#if error?.formErrors[0]}
			<p class="text-sm font-normal text-red-600">{error?.formErrors[0]}</p>
		{/if}
	</label>
	<button
		type="submit"
		class="shadow-neu-outter px-3 py-1.5 rounded-full active:shadow-neu-inner active:translate-y-0.5 transition focus:outline-[#BBA6F8]"
		>Sign Up</button
	>

	<p>
		Already have an account?
		<a href="/login" class="text-slate-700 hover:underline hover:text-light-purple font-bold">
			Log in
		</a>
	</p>
</form>

<style lang="postcss">
	:global(body) {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 4rem;
		height: 100vh;
		background: linear-gradient(116.15deg, #4772e1 4.13%, #cb397f 97.53%);
		background-repeat: no-repeat;
	}
</style>
