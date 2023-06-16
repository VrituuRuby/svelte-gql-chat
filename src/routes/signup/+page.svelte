<script lang="ts">
	import { signUp } from '$lib/auth';

	let email: string;
	let name: string;
	let password: string;

	async function handleSubmit() {
		await signUp({ email, password, name });
	}
</script>

<form
	on:submit|preventDefault={handleSubmit}
	class="w-full max-w-[500px] flex flex-col gap-1 bg-gray-100 p-6 justify-center items-center backdrop:blur-lg font-[Roboto] rounded-md drop-shadow-lg"
>
	<h1 class="font-rubik text-lg font-bold">Sign up to GQL Chat</h1>
	<label class="flex flex-col w-full font-rubik">
		Email
		<input
			type="email"
			placeholder="Email"
			bind:value={email}
			class="text-base font-roboto py-1.5 px-3 rounded-full"
		/>
	</label>
	<label class="flex flex-col">
		User
		<input type="text" placeholder="Username" bind:value={name} />
	</label>

	<label class="flex flex-col">
		Password
		<input type="password" placeholder="Password" bind:value={password} />
	</label>

	<label class="flex flex-col">
		Confirm Password
		<input type="password" placeholder="Password" />
	</label>
	<button type="submit">Sign Up</button>
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
