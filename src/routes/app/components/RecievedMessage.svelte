<script lang="ts">
	import dayjs from 'dayjs';

	interface IMessage {
		text: string;
		user_id: number;
		createdAt: Date;
		user: {
			id: number;
			name: string;
		};
	}
	export let messageData: IMessage;
</script>

<div class="w-full flex flex-col gap-1">
	<div class="flex items-end drop-shadow-neu-outter">
		<div class="border-transparent border-8 border-r-gray-100 border-b-gray-100" />
		<div class="p-2 bg-slate-100 rounded-md rounded-bl-none text-gray-700">
			{messageData.text}
		</div>
	</div>
	<span class="text-gray-600 text-sm font-bold"
		>{dayjs(messageData.createdAt).format('HH:mm A')}</span
	>
</div>
