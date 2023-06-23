<script lang="ts">
	import { query } from 'svelte-apollo';
	import Chat from './components/Chat.svelte';
	import { GET_USER_DATA } from '../../graphql/queries';
	import { onMount } from 'svelte';
	import RoomsList from './components/RoomsList.svelte';
	import { goto } from '$app/navigation';

	interface UserData {
		user: {
			id: string;
			email: string;
			name: string;
			rooms: Room[];
		};
	}

	interface Room {
		id: number;
		name: string;
		messages: {
			text: string;
			createdAt: Date;
			user: {
				id: string;
				name: string;
			};
		}[];
	}

	let selectRoom: Room | undefined;

	let userData: UserData;
	const getData = query<UserData>(GET_USER_DATA);
	async function loadData() {
		try {
			userData = (await getData.result()).data;
		} catch (error) {
			console.log(error);
			goto('/login');
		}
	}

	onMount(loadData);
	function handleSelectRoom(event: CustomEvent) {
		selectRoom = userData?.user.rooms.find((room) => room.id === event.detail.id);
	}
</script>

<svelte:head>
	<title>ChatGQL</title>
</svelte:head>

<main
	class="bg-default w-full h-full rounded-md drop-shadow-lg flex flex-1 flex-shrink-[2] basis-0 overflow-hidden"
>
	<RoomsList rooms={userData?.user.rooms} on:selectRoom={handleSelectRoom} />
	{#if selectRoom}
		<Chat chat={selectRoom} />
	{:else}
		<h1>Clique em um chat para abrir a conversa</h1>
	{/if}
</main>

<style lang="postcss">
	:global(body) {
		height: 100vh;
		padding: 0.5rem;
		background: linear-gradient(116.15deg, #4772e1 4.13%, #cb397f 97.53%);
	}
</style>
