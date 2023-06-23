<script lang="ts">
	import { mutation } from 'svelte-apollo';
	import { SIGN_IN } from '../../graphql/queries.js';
	import { ZodError, z } from 'zod';
	import { ApolloError } from '@apollo/client/errors';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	let formError: string[];

	const getFormData = z.object({
		email: z.string().email('Email is missing'),
		password: z.string().nonempty('Password is missing')
	});

	interface SignInData {
		signIn: {
			token: string;
		};
	}
	const auth = mutation<SignInData>(SIGN_IN);

	async function signIn() {
		try {
			const formData = getFormData.parse({ email, password });
			const response = await auth({ variables: { data: formData } });
			const token = response.data?.signIn?.token;
			token
				? localStorage.setItem('@svelte-chat-1.0:access-token', token)
				: new Error('Token not recieved');
			goto('/app');
		} catch (err) {
			if (err instanceof ZodError) {
				formError = err.issues.map((e) => e.message);
			}
			if (err instanceof ApolloError) {
				formError = [err.message];
			}
			if (err instanceof Error) formError = [err.message];
		}
	}
	async function handleSubmit() {
		formError = [];
		signIn();
	}
</script>

<svelte:head>
	<title>Login into ChatGQL</title>
</svelte:head>

<form
	on:submit|preventDefault={handleSubmit}
	class="w-full max-w-[500px] flex flex-col gap-2 mt-4 bg-gray-100 p-6 justify-center items-center font-[Roboto] rounded-md drop-shadow-lg text-sm"
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

<style lang="postcss">
	:global(body) {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		height: 100vh;
		background: linear-gradient(116.15deg, #4772e1 4.13%, #cb397f 97.53%);
		background-repeat: no-repeat;
	}
</style>
