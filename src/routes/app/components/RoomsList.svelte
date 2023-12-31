<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import dayjs from 'dayjs';
	import { rooms } from '../RoomsStore';
	import SearchBar from './SearchBar.svelte';

	let dispatcher = createEventDispatcher();

	export let loading: boolean;

	function handleRoomSelection(roomIndex: number) {
		dispatcher('roomSelect', roomIndex);
	}

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
		return dayjs(date).format('HH:mm A');
	}
</script>

<ul class="flex flex-col w-1/4 p-2 shadow-2xl z-20">
	<SearchBar on:open_add_friend on:open_create_room />
	{#if loading}
		<p>Loading...</p>
	{:else}
		{#each $rooms as room, i}
			<li class="font-roboto">
				<button
					on:click={() => handleRoomSelection(room.id)}
					class="flex gap-2 w-full p-2 items-start"
				>
					<div
						class="min-w-[50px] min-h-[50px] text-2xl font-bold bg-blue-400 text-white flex items-center justify-center rounded-full border-white drop-shadow-neu-outter border-2"
					>
						{#if room.name}
							{nameShorterner(room.name)}
						{/if}
					</div>

					<div class="flex flex-col justify-start truncate w-full">
						{#if room.messages.length > 0}
							<div class="flex justify-between items-center gap-2">
								{#if room.name}
									<h3 class="font-bold text-lg text-dark-slate truncate">{room.name}</h3>
								{:else}
									<h3 class="font-bold text-lg text-dark-slate truncate">
										{room.users.map((user) => user.name).join(',')}
									</h3>
								{/if}
								<span class="font-bold text-gray">
									{formatDate(room.messages.slice(-1)[0].createdAt || '')}
								</span>
							</div>
							<p class="text-left text-default text-gray truncate">
								<strong>
									{room.messages.slice(-1)[0].user.name}:
								</strong>
								{room.messages.slice(-1)[0].text}
							</p>
						{:else}
							<h3 class="font-bold text-lg text-left text-dark-slate truncate">{room.name}</h3>
						{/if}
					</div>
				</button>
			</li>
		{/each}
	{/if}
</ul>
