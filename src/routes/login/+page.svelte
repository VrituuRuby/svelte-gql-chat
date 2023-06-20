<script lang="ts">
	import { goto } from '$app/navigation';
	import { signIn } from '$lib/userService';
	import { ZodError, z } from 'zod';

	let email = '';
	let password = '';
	let error: ZodError;

	const getFormData = z.object({
		email: z.string().email('Email is missing'),
		password: z.string()
	});

	async function handleSubmit() {
		try {
			const formData = getFormData.parse({ email, password });
			const response = await signIn(formData);
			console.log(response);
			goto('/app');
		} catch (err) {
			if (err instanceof z.ZodError) {
				error = err;
				console.log(error);
			}
		}
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
			required
			placeholder="Email"
			class="text-base font-roboto py-1.5 px-3 rounded-full bg-gray-50 shadow-neu-inner font-normal text-black focus:outline-light-purple"
		/>
	</label>

	<label class="flex flex-col font-rubik font-semibold text-gray-500">
		Password
		<input
			required
			bind:value={password}
			name="password"
			type="password"
			placeholder="Password"
			class="text-base font-roboto py-1.5 px-3 rounded-full bg-gray-50 shadow-neu-inner font-normal text-black focus:outline-[#BBA6F8]"
		/>
	</label>

	{#if error}
		{#each error.errors as err}
			<p class="text-red-600">{err.message}</p>
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
