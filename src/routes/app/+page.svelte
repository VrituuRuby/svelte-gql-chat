<script lang="ts">
	import { query, subscribe } from 'svelte-apollo';
	import Chat from './components/Chat.svelte';
	import { GET_USER_DATA, SUBSCRIBE_TO_MESSAGES } from '../../graphql/queries';
	import RoomsList from './components/RoomsList.svelte';

	interface UserData {
		user: {
			id: number;
			email: string;
			name: string;
			rooms: Room[];
		};
	}

	interface Room {
		id: number;
		name: string;
		users: {
			id: number;
			name: string;
		}[];
		messages: IMessage[];
	}
	interface IMessage {
		text: string;
		createdAt: Date;
		user_id: number;
		user: {
			id: number;
			name: string;
		};
	}

	interface SubscribeDataMessages {
		newMessage: IMessage;
	}

	let selectRoom: Room | undefined;

	const user = query<UserData>(GET_USER_DATA);
	const subscribeMessages = subscribe<SubscribeDataMessages>(SUBSCRIBE_TO_MESSAGES, {
		variables: { data: 1 }
	});

	console.log($subscribeMessages.data);

	function handleSelectRoom(event: CustomEvent) {
		selectRoom = $user?.data?.user.rooms.find((room) => room.id === event.detail.id);
		user.refetch();
	}
</script>

<svelte:head>
	<title>ChatGQL</title>
</svelte:head>

<main
	class="bg-default w-full h-full rounded-md drop-shadow-lg flex flex-1 flex-shrink-[2] basis-0 overflow-hidden"
>
	{#if $user.loading}
		<li>Loading</li>
	{:else if $user.error}
		<li class="text-red-600">ERROR: {$user.error}</li>
	{:else if $user.data}
		<RoomsList rooms={$user.data.user.rooms} on:selectRoom={handleSelectRoom} />
	{/if}
	{#if selectRoom && $user.data}
		<Chat chat={selectRoom} user_id={$user.data.user.id} on:sendMessage={() => user.refetch()} />
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
