<script lang="ts">
	import { clickOutside } from '$lib/clickOutside';
	import { SvelteComponent, createEventDispatcher } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';

	export let showModal = false;
	export let loading = false;

	let dispatcher = createEventDispatcher();

	function handleCloseModal() {
		dispatcher('close_modal');
	}
</script>

{#if showModal}
	<div
		class="absolute w-screen h-screen top-0 left-0 backdrop-blur-sm bg-[rgba(0,0,0,0.6)] z-30 flex items-center justify-center"
		transition:fade
	>
		<div
			transition:fly={{ y: 200, duration: 200 }}
			class="p-5 bg-default rounded-md relative shadow-lg"
			use:clickOutside
			on:click_outside={handleCloseModal}
		>
			<button
				on:click={handleCloseModal}
				class="absolute text-gray text-lg top-0 right-0 font-bold w-6 h-6 m-2 rounded-full justify-center items-center flex"
				>X</button
			>
			{#if loading}
				<div
					class="w-[50px] h-[50px] rounded-full border-blue-400 border-4 border-t-slate-300 animate-spin"
				/>
			{:else}
				<slot />
			{/if}
		</div>
	</div>
{/if}
