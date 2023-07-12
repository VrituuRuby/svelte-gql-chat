<script lang="ts">
	import { ZodError, z } from 'zod';
	import { ApolloError } from '@apollo/client/errors';
	import { goto } from '$app/navigation';
	import client from '../../client';
	import { SignInDoc, type SignInMutation } from '../../generated/generated';

	let email = '';
	let password = '';

	let formError: string[];

	const getFormData = z.object({
		email: z.string().email('Email is missing'),
		password: z.string().nonempty('Password is missing')
	});

	async function login() {
		try {
			const formData = getFormData.parse({ email, password });
			const token = await client()
				.mutate<SignInMutation>({ mutation: SignInDoc, variables: { data: formData } })
				.then((res) => res.data?.signIn.token);

			token
				? localStorage.setItem('@svelte-chat-1.1.0:access-token', token)
				: new Error('Token not recieved');
			console.log('Added token', token);

			goto('/app');
		} catch (err) {
			console.log(err);
			if (err instanceof ZodError) {
				formError = err.issues.map((e) => e.message);
			} else if (err instanceof ApolloError) {
				formError = [err.message];
			} else if (err instanceof Error) {
				formError = [err.message];
			}
		}
	}
	async function handleSubmit() {
		formError = [];
		login();
	}
</script>

<svelte:head>
	<title>Login into ChatGQL</title>
</svelte:head>

<form
	on:submit|preventDefault={handleSubmit}
	class="w-full max-w-[500px] flex flex-col gap-2 bg-gray-100 p-6 justify-center items-center font-[Roboto] rounded-md drop-shadow-lg text-sm bg-default"
>
	<img src="/images/logo.svg" alt="" />
	<h1 class="font-rubik text-lg font-bold">Welcome to GQL Chat!</h1>
	<label class="flex flex-col font-rubik font-semibold text-gray-500">
		Email
		<input
			type="email"
			bind:value={email}
			name="email"
			placeholder="Email"
			class="text-base font-roboto py-1.5 px-3 rounded-full bg-gray-50 shadow-neu-inner font-normal text-black focus:outline-light-purple"
		/>
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
	</label>

	{#if formError}
		{#each formError as error}
			<p class="text-red-600 text-sm">{error}</p>
		{/each}
	{/if}

	<button
		type="submit"
		class="shadow-neu-outter px-3 py-1.5 rounded-full active:shadow-neu-inner active:translate-y-0.5 transition focus:outline-[#BBA6F8]"
		>Sign in</button
	>

	<p>
		Need an account? <a
			href="/signup"
			class="text-slate-700 font-bold hover:underline hover:text-light-purple">Sign up</a
		>
	</p>
</form>
