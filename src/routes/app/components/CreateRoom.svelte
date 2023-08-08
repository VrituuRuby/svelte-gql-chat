<script lang="ts">
	import { onMount } from 'svelte';
	import client from '../../../client';
	import { FindUserByEmailDoc, findUserByEmail } from '../../../generated/generated';

	let nameInput: HTMLElement;
	onMount(() => {
		nameInput.focus();
	});

	async function handleCreateNewRoom() {
		const api = client();
		const data = await api.query({ query: findUserByEmail, variables: { email } });
		console.log(data.data);
	}
</script>

<form
	class="flex flex-col gap-4 w-[500px] justify-center items-center"
	on:submit|preventDefault={handleCreateNewRoom}
>
	<h3 class="font-rubik text-2xl text-dark-slate text-center font-bold">
		CREATE A NEW CHATTING ROOM
	</h3>
	<input
		type="text"
		name="name"
		bind:this={nameInput}
		placeholder="Room name"
		required
		class="p-2 px-4 rounded-full bg-transparent shadow-neu-inner focus:outline-light-purple w-full backdrop-"
	/>
	<button
		type="submit"
		class="py-2 px-4 rounded-full bg-light-gray shadow-neu-outter active:shadow-neu-inner active:translate-y-1 transition"
		>Create</button
	>
</form>
