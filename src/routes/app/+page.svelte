<script lang="ts">
	import { onMount } from 'svelte';
	import client from '../../client';
	import { FetchDataDoc } from '../../generated/generated';
	import type { FetchDataQuery, Room } from '../../generated/generated';
	import { goto } from '$app/navigation';

	let loading = true;
	let rooms;
	onMount(async () => {
		const token = localStorage.getItem('@svelte-chat-1.1.0:access-token');

		try {
			const data = await client(token).query<FetchDataQuery>({ query: FetchDataDoc });
			rooms = data.data.user.rooms;
			console.log(data);
			loading = false;
		} catch (err) {
			console.log(err);
			goto('/login');
		}
	});
</script>

<svelte:head>
	<title>ChatGQL</title>
</svelte:head>

<main
	class="bg-default w-full h-full rounded-md drop-shadow-lg flex flex-1 flex-shrink-[2] basis-0 overflow-hidden justify-center item"
>
	{#if loading}
		<div class="h-full w-full grid content-center justify-center">
			<div
				class="rounded-full w-[200px] h-[200px] border-[20px] border-slate-400 border-t-slate-600 animate-spin"
			/>
		</div>
	{:else}
		<div>
			<p>{JSON.stringify(rooms)}</p>
		</div>
	{/if}
</main>

<style lang="postcss">
	:global(body) {
		padding: 0.5rem;
	}
</style>
