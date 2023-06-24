<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	interface Room {
		id: number;
		name: string;
		messages: {
			text: string;
			createdAt: Date;
			user: {
				id: number;
				name: string;
			};
		}[];
	}

	export let rooms: Room[] | undefined;

	const dispatcher = createEventDispatcher();

	function selectRoom(id: number) {
		dispatcher('selectRoom', {
			id
		});
	}
</script>

<div class="flex flex-col p-2 gap-2 h-full w-1/4 border-r border-slate-300">
	<div class="flex gap-2 items-center">
		<img src="/images/logo.svg" alt="ChatGQL" width="42px" />
		<div
			class="flex items-center flex-1 gap-1 rounded-full shadow-neu-inner bg-default px-1.5 focus-within:outline outline-2 outline-light-purple"
		>
			<Icon icon="material-symbols:search" class="text-slate-500" width="24px" />
			<input type="search" class="focus:outline-none bg-transparent w-full py-2" />
		</div>
	</div>
	<ul class="w-full gap-2">
		{#if rooms}
			{#each rooms as room}
				<li>
					<button
						on:click={() => selectRoom(room.id)}
						class="flex items-center justify-start gap-2 p-2 w-full font-roboto bg-light-gray hover:brightness-105 transition"
					>
						<div
							class="text-2xl flex justify-center w-[50px] h-[50px] items-center rounded-full bg-blue-600 text-white p-4 font-bold shadow-neu-outter border-light-gray border-[3px]"
						>
							*
						</div>
						<div class="w-full p-1 gap-1">
							<div class="flex justify-between items-center">
								<strong class="text-slate-700">{room.name}</strong>
								<span class="text-sm font-bold text-slate-500">17:30 PM</span>
							</div>
							<div class="flex justify-between">
								<p class="text-slate-500">Expecifique</p>
								<span
									class="rounded-full text-white flex justify-center items-center w-5 h-5 text-sm font-bold bg-light-purple"
									>+9</span
								>
							</div>
						</div>
					</button>
				</li>
			{/each}
		{/if}
	</ul>
</div>
