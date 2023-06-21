<script lang="ts">
	import { error } from '@sveltejs/kit';

	let email = '';
	let password = '';

	export let form;
</script>

<svelte:head>
	<title>Login into ChatGQL</title>
</svelte:head>

<form
	method="post"
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

	{#if form?.backendError}
		<p class="text-red-600">{form?.backendError.message}</p>
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
