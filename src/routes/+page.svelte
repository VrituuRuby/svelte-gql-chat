<script lang="ts">
	import { signIn } from '$lib/auth';

	let email: string;
	let password: string;

	function submit() {
		console.log({ email, password });
		signIn({ email, password });
	}
</script>

<h1 class="font-serif font-bold text-4xl">Welcome to SvelteKit</h1>

<form on:submit|preventDefault={submit}>
	<input type="email" placeholder="Email" bind:value={email} />
	<input type="password" placeholder="Senha" bind:value={password} />
	<button type="submit">Entrar</button>
</form>
