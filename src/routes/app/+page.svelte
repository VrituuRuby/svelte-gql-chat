<script lang="ts">
	import { onMount } from 'svelte';
	import RoomsList from './components/RoomsList.svelte';
	import Chat from './components/Chat/index.svelte';
	import client from '../../client';
	import {
		GetRoomsDataDoc,
		RoomsMessagesDoc,
		type GetRoomsDataQuery,
		type RoomsMessagesSubscription,
		type SendMessageMutation,
		SendMessageDoc
	} from '../../generated/generated';
	import { goto } from '$app/navigation';
	import { rooms } from './RoomsStore';
	import Modal from '../components/Modal.svelte';
	import CreateRoom from './components/CreateRoom.svelte';
	import AddFriend from './components/AddFriend.svelte';
	import { tokenKey } from '$lib/api';

	let loading = true;
	let selectedRoomIndex: number;

	let showAddFriend = false;
	let showCreateRoom = false;

	function handleRoomSelection(event: CustomEvent) {
		selectedRoomIndex = $rooms.findIndex((r) => r.id === event.detail);
	}

	function handleSendMessage(event: CustomEvent) {
		const token = localStorage.getItem(tokenKey);
		const api = client(token);

		const data = event.detail;

		api.mutate<SendMessageMutation>({ mutation: SendMessageDoc, variables: { data } });
	}

	onMount(async () => {
		const token = localStorage.getItem(tokenKey);
		const api = client(token);

		try {
			const data = await api.query<GetRoomsDataQuery>({ query: GetRoomsDataDoc });
			rooms.setRooms(data.data.rooms);
			loading = false;
		} catch (err) {
			console.log('Error with the token', err);
			goto('/login');
		}

		try {
			api
				.subscribe<RoomsMessagesSubscription>({
					query: RoomsMessagesDoc
				})
				.subscribe({
					next: ({ data }) => {
						if (data) {
							rooms.addMessage({
								roomId: data.roomsMessages.room_id,
								roomMessage: data.roomsMessages
							});
						}
					}
				});
		} catch (err) {
			console.log('Error with new messages subscription', err);
		}
	});
</script>

<svelte:head>
	<title>ChatGQL</title>
</svelte:head>

<main
	class="bg-default h-full rounded-md drop-shadow-lg flex flex-1 flex-shrink-[2] basis-0 overflow-hidden"
>
	<Modal showModal={showAddFriend} on:close_modal={() => (showAddFriend = false)}>
		<AddFriend />
	</Modal>
	<Modal showModal={showCreateRoom} on:close_modal={() => (showCreateRoom = false)}>
		<CreateRoom />
	</Modal>

	<RoomsList
		on:roomSelect={handleRoomSelection}
		{loading}
		on:open_add_friend={() => {
			showAddFriend = true;
			console.log('add friend click');
		}}
		on:open_create_room={() => (showCreateRoom = true)}
	/>
	{#if selectedRoomIndex !== undefined}
		<Chat room={$rooms[selectedRoomIndex]} on:sendMessage={handleSendMessage} />
	{:else}
		<h3>Selecione uma conversa para visualizar as mensagens</h3>
	{/if}
</main>
