<script lang="ts">
	import '../style.css';
</script>

<slot />

<style lang="postcss">
	:global(body) {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 0.5rem;
		height: 100vh;
		background: linear-gradient(116.15deg, #4772e1 4.13%, #cb397f 97.53%);
		background-repeat: no-repeat;
	}
</style>
