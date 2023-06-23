<script lang="ts">
	import type { IRoom } from '$lib/chatService';
	import Chat from './components/Chat.svelte';
	import ContactList from './components/ContactList.svelte';

	export let data;
	let selectedRoom: IRoom | undefined;

	function handleSelectRoom(event: CustomEvent) {
		selectedRoom = data.user.rooms.find((room) => room.id === event.detail.id);
	}
</script>

<svelte:head>
	<title>ChatGQL</title>
</svelte:head>

<main class="bg-default w-full h-full rounded-md drop-shadow-lg flex flex-1">
	<ContactList rooms={data.user.rooms} on:selectRoom={handleSelectRoom} />
	{#if selectedRoom}
		<Chat chat={selectedRoom} />
	{:else}
		<h3>Vazio</h3>
	{/if}
</main>

<style lang="postcss">
	:global(body) {
		height: 100vh;
		padding: 0.5rem;
		background: linear-gradient(116.15deg, #4772e1 4.13%, #cb397f 97.53%);
	}
</style>
