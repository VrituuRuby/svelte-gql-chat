<script lang="ts">
	import RoomsList from './components/RoomsList.svelte';
	import { rooms } from './roomsStore';

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

	function handleRoomSelection(event: CustomEvent) {
		selectedRoom = $rooms[event.detail];
	}
</script>

<svelte:head>
	<title>ChatGQL</title>
</svelte:head>

<main
	class="bg-default w-full h-full rounded-md drop-shadow-lg flex flex-1 flex-shrink-[2] basis-0 overflow-hidden"
>
	<div class="w-[300px]">
		<RoomsList on:roomSelect={handleRoomSelection} />
	</div>
	<div>
		{#if selectedRoom}
			<ul>
				{#each $rooms[0].messages as message}
					<p>
						{message.user.name}
						{message.text}
						<span>{message.createdAt}</span>
					</p>
				{/each}
			</ul>
		{/if}
	</div>
</main>
