<script>
	import ContactList from './ContactList.svelte';
</script>

<svelte:head>
	<title>ChatGQL</title>
</svelte:head>

<main class="bg-default w-full h-full rounded-md drop-shadow-lg">
	<ContactList />
</main>

<style lang="postcss">
	:global(body) {
		height: 100vh;
		padding: 0.5rem;
		background: linear-gradient(116.15deg, #4772e1 4.13%, #cb397f 97.53%);
	}
</style>
