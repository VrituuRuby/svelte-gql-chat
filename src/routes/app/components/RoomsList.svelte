<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { rooms } from '../roomsStore';
	import client from '../../../client';
	import dayjs from 'dayjs';
	import {
		GetRoomsDataDoc,
		RoomsMessagesDoc,
		type GetRoomsDataQuery,
		type RoomsMessagesSubscription
	} from '../../../generated/generated';
	import { goto } from '$app/navigation';

	let dispatcher = createEventDispatcher();
	let loading = true;

	function handleRoomSelection(roomIndex: number) {
		dispatcher('roomSelect', roomIndex);
	}

	onMount(async () => {
		const token = localStorage.getItem('@svelte-chat-1.1.0:access-token');
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

	function nameShorterner(name: string) {
		let words = name.split(' ');

		if (words.length === 1) {
			return name.slice(0, 2).toUpperCase();
		} else {
			let firstLetters = words.slice(0, 2).map((word) => word[0].toUpperCase());
			return firstLetters.join('');
		}
	}

	function formatDate(date: Date) {
		return dayjs(date).format('HH:mmA');
	}
</script>

<ul class="w-full">
	{#if loading}
		<p>Loading...</p>
	{:else}
		{#each $rooms as room, i}
			<li class="w-full">
				<button on:click={() => handleRoomSelection(i)} class="flex gap-2 w-full p-2 items-center">
					<div
						class=" p-4 bg-blue-400 text-white flex items-center justify-center rounded-full border-white border drop-shadow-neu-outter"
					>
						{nameShorterner(room.name)}
					</div>

					<div class="flex flex-col flex-1 gap-1">
						<div class="flex justify-between w-full items-center">
							<h3 class="font-bold text-slate-800">{room.name}</h3>
							<span class="text-xs font-bold text-slate-500"
								>{formatDate(room.messages.slice(-1)[0].createdAt)}</span
							>
						</div>
						{#if room.messages.length > 0}
							<p class="text-left text-sm">
								<strong class="text-slate-600">
									{room.messages.slice(-1)[0].user.name}:
								</strong>
								{room.messages.slice(-1)[0].text}
							</p>
						{/if}
					</div>
				</button>
			</li>
		{/each}
	{/if}
</ul>
