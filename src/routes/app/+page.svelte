<script lang="ts">
	import { onMount } from 'svelte';
	import RoomsList from './components/RoomsList.svelte';
	import client from '../../client';
	import {
		GetRoomsDataDoc,
		RoomsMessagesDoc,
		type GetRoomsDataQuery,
		type RoomsMessagesSubscription
	} from '../../generated/generated';
	import { goto } from '$app/navigation';
	import { AppStore } from './AppStore';

	interface IRoom {
		id: number;
		name: string;
		messages: {
			id: number;
			createdAt: Date;
			text: string;
			room_id?: number;
			user_id: number;
			user: {
				id?: number;
				name: string;
			};
		}[];
		users: {
			id: number;
			name: string;
		}[];
	}

	let selectedRoom: IRoom | undefined;
	let loading = true;

	function handleRoomSelection(event: CustomEvent) {
		AppStore.setSelectedRoomIndex(event.detail);
	}

	onMount(async () => {
		const token = localStorage.getItem('@svelte-chat-1.1.0:access-token');
		const api = client(token);

		try {
			const data = await api.query<GetRoomsDataQuery>({ query: GetRoomsDataDoc });
			AppStore.setRooms(data.data.rooms);
			loading = false;
			console.log(loading);
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
							AppStore.addMessage({
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
	class="bg-default h-full rounded-md drop-shadow-lg flex flex-1 flex-shrink-[2] p-2 basis-0 overflow-hidden"
>
	<div class="w-1/4">
		<RoomsList on:roomSelect={handleRoomSelection} {loading} />
	</div>
	<div class="p-2">
		{#if $AppStore.selectedRoomIndex !== undefined}
			<ul>
				{#each $AppStore.rooms[0].messages as message}
					<p>
						{message.user.name}1
						{message.text}
						<span>{message.createdAt}</span>
					</p>
				{/each}
			</ul>
		{/if}
	</div>
</main>
