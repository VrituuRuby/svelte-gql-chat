<script lang="ts">
	import type { IMessage } from '$lib/chatService';
	import dayjs from 'dayjs';

	export let messageData: IMessage;
</script>

<div class="w-full flex flex-col items-end gap-1">
	<div class="flex items-end drop-shadow-neu-outter">
		<div class="p-2 bg-light-purple rounded-md rounded-br-none text-gray-700">
			{messageData.text}
		</div>
		<div class="border-transparent border-8 border-l-light-purple border-b-light-purple" />
	</div>
	<span class="text-gray-600 text-sm font-bold"
		>{dayjs(messageData.createdAt).format('HH:mm A')}</span
	>
</div>
