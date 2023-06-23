<script lang="ts">
	import type { IRoom } from '$lib/chatService';
	import RecievedMessage from './RecievedMessage.svelte';
	import SentMessage from './SentMessage.svelte';

	export let chat: IRoom;
</script>

<div class="w-full h-full">
	<header>
		{chat.name}
	</header>
	<div class="flex flex-col gap-2 p-2 h-full overflow-y-scroll">
		{#each chat.messages as msg}
			<RecievedMessage messageData={msg} />
			<SentMessage messageData={msg} />
		{/each}
	</div>
</div>
