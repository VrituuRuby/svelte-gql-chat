<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import RecievedMessage from './RecievedMessage.svelte';
	import SentMessage from './SentMessage.svelte';
	import { mutation } from 'svelte-apollo';
	import { SEND_MESSAGE } from '../../../graphql/queries';

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

	export let chat: Room;
	export let user_id: number;

	export let messages: IMessage[] = chat.messages;

	let message = '';

	const dispatcher = createEventDispatcher();

	const sendMessage = mutation(SEND_MESSAGE);
	function handleSendMessage() {
		dispatcher('sendMessage', { message });
		sendMessage({ variables: { data: { room_id: chat.id, text: message } } });
		message = '';
	}
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
		{#each messages as msg}
			{#if msg.user_id === user_id}
				<SentMessage messageData={msg} />
			{:else}
				<RecievedMessage messageData={msg} />{/if}
		{/each}
	</div>
	<div class="flex w-full">
		<form on:submit={handleSendMessage} class="flex w-full">
			<input
				type="text"
				placeholder="Digite sua menságem aqui"
				class="flex-1 p-4"
				bind:value={message}
			/>
		</form>
	</div>
</div>
