<script lang="ts">
	import { clickOutside } from '$lib/clickOutside';
	import { createEventDispatcher } from 'svelte';

	let showMenu = false;

	function toggleShowMenu() {
		showMenu = !showMenu;
	}

	let dispatcher = createEventDispatcher();
	function handleCreateRoom() {
		dispatcher('open_create_room');
	}

	function handleAddFriend() {
		dispatcher('open_add_friend');
	}
</script>

<div
	class="relative"
	use:clickOutside
	on:click_outside={() => {
		showMenu = false;
	}}
>
	<button on:click={toggleShowMenu} class="rounded bg-default hover:bg-white">
		<img src="./images/logo.svg" alt="" class="w-[42px]" />
	</button>
	{#if showMenu}
		<ul class="absolute top-full z-10 p-2 min-w-[180px] bg-default rounded gap-1 shadow-md">
			<li class="">
				<button class="p-1 hover:bg-white w-full" on:click={handleCreateRoom}>Criar sala</button>
			</li>
			<li class="">
				<button class="p-1 hover:bg-white w-full" on:click={handleAddFriend}>Adicionar Amigo</button
				>
			</li>
			<li class=""><button class="p-1 hover:bg-white w-full">Sair</button></li>
		</ul>
	{/if}
</div>
