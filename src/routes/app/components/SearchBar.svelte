<script lang="ts">
	import client from '../../../client';
	import MenuButton from './MenuButton.svelte';

	let text = '';

	function handleSearchText() {
		console.log(text);
		text = '';
	}
</script>

<div class="flex gap-1 w-full justify-center items-center">
	<MenuButton on:open_add_friend on:open_create_room />
	<form on:submit={handleSearchText} class="w-full">
		<input
			type="text"
			bind:value={text}
			placeholder="Procure suas conversas aqui!"
			class="w-full rounded-full p-2 shadow-neu-inner bg-default"
		/>
	</form>
</div>
