<script lang="ts">
	import RecievedMessage from './RecievedMessage.svelte';
	import SentMessage from './SentMessage.svelte';

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

	export let chat: Room;
</script>

<div class="flex flex-col w-full h-full overflow-hidden flex-grow flex-shrink-[2] basis-0">
	<header>
		{chat.name}
	</header>
	<div class="flex flex-col flex-1 gap-2 p-2 overflow-y-scroll">
		{#each chat.messages as msg}
			<RecievedMessage messageData={msg} />
			<SentMessage messageData={msg} />
		{/each}
	</div>
	<div class="flex w-full">
		<input type="text" placeholder="Digite sua menságem aqui" class="flex-1 p-4" />
	</div>
</div>
