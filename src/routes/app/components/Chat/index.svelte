<script lang="ts">
	import { afterUpdate, beforeUpdate, createEventDispatcher, onMount } from 'svelte';
	import client from '../../../../client';
	import type { IRoom } from '../../RoomsStore';
	import Message from './components/Message.svelte';

	export let room: IRoom;

	let text = '';

	let main: HTMLElement;
	let autoscroll = false;

	beforeUpdate(() => {
		if (main) {
			const scrollableDistance = main.scrollHeight - main.offsetHeight;
			autoscroll = main.scrollTop > scrollableDistance - 20;
		}
	});

	afterUpdate(() => {
		if (autoscroll) {
			main.scrollTo(0, main.scrollHeight);
		}
	});

	onMount(() => {
		if (main) {
			main.scrollTop = main.scrollHeight;
		}
	});

	const dispatcher = createEventDispatcher();
	function handleSendMessage() {
		if (text.trim().length > 0) {
			dispatcher('sendMessage', { text, room_id: room.id });
			text = '';
		}
	}
</script>

<div class="flex flex-col flex-1">
	<header class="p-2 w-full shadow-lg flex flex-col justify-center">
		<h3 class="text-dark-slate font-bold truncate">{room.name}</h3>
		<p class="text-small font-bold text-gray">{room.users.map((user) => user.name).join(', ')}</p>
	</header>
	<main class={`p-4 flex-1  overflow-y-auto ${autoscroll ? 'scroll-smooth' : ''}`} bind:this={main}>
		<ul class="gap-2 flex-col flex">
			{#each room.messages as message}
				<Message {message} />
			{/each}
		</ul>
	</main>
	<form on:submit|preventDefault={handleSendMessage}>
		<input
			type="text"
			placeholder="Digite aqui sua mensagem"
			class="p-4 w-full"
			bind:value={text}
		/>
	</form>
</div>
