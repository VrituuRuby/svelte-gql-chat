<script lang="ts">
	import dayjs from 'dayjs';
	import type { IMessage } from '../../../RoomsStore';

	const loggedUserId = localStorage.getItem('@svelte-chat-1.1.0:user-id');
	let isSender = true;
	export let message: IMessage;

	if (loggedUserId) {
		isSender = Number(loggedUserId) === message.user_id ? true : false;
	}

	function timeFormat(date: Date): String {
		return dayjs(date).format('HH:mm A');
	}
</script>

<div class="flex flex-col {isSender ? 'items-end' : 'items-start'} text-slight-black">
	<p
		class="p-2 rounded-lg text-slight-black drop-shadow-neu-outter
		{isSender ? 'bg-light-purple rounded-br-none' : 'bg-slate-100 rounded-bl-none'}"
	>
		{message.text}
	</p>
	<span class="font-bold opacity-70">{timeFormat(message.createdAt)}</span>
</div>
