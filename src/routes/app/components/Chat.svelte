<script lang="ts">
	import RecievedMessage from './RecievedMessage.svelte';
	import SentMessage from './SentMessage.svelte';

	interface Room {
		id: number;
		name: string;
		users: {
			id: number;
			name: string;
		}[];
		messages: {
			text: string;
			createdAt: Date;
			user_id: number;
			user: {
				id: number;
				name: string;
			};
		}[];
	}

	export let chat: Room;
	export let user_id: number;
</script>

<div class="flex flex-col w-full h-full overflow-hidden flex-grow flex-shrink-[2] basis-0">
	<header class="p-2 flex flex-col">
		<strong>{chat.name}</strong>
		<span
			>{chat.users
				.map((user) => user.name)
				.sort()
				.join(', ')}</span
		>
	</header>
	<div class="flex flex-col flex-1 gap-2 p-2 overflow-y-scroll">
		{#each chat.messages as msg}
			{#if msg.user_id === user_id}
				<SentMessage messageData={msg} />
			{:else}
				<RecievedMessage messageData={msg} />{/if}
		{/each}
	</div>
	<div class="flex w-full">
		<input type="text" placeholder="Digite sua menságem aqui" class="flex-1 p-4" />
	</div>
</div>
