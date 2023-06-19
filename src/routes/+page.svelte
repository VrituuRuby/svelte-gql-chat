<script lang="ts">
	let email: string;
	let password: string;
</script>

<h1 class="font-serif font-bold text-4xl">Welcome to SvelteKit</h1>

<form>
	<input type="email" placeholder="Email" bind:value={email} />
	<input type="password" placeholder="Senha" bind:value={password} />
	<button type="submit">Entrar</button>
</form>
