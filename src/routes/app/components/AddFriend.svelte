<script lang="ts">
	import { onMount } from 'svelte';
	import client from '../../../client';
	import { FindUserByEmailDoc, type FindUserByEmailQuery } from '../../../generated/generated';
	import { ApolloError } from '@apollo/client/core';

	let emailInput: HTMLElement;
	let email = '';

	interface IUser {
		id: number;
		email: string;
		name: string;
	}
	let user: IUser;
	let errorFindingUser: String;

	onMount(() => {
		emailInput.focus();
	});

	async function findUserByEmail() {
		const api = client();

		try {
			const data = await api.query<FindUserByEmailQuery>({
				query: FindUserByEmailDoc,
				variables: { email }
			});
			user = data.data.userByEmail;
		} catch (error: any) {
			if (error instanceof ApolloError) {
				errorFindingUser = error.message;
			}
		}
		email = '';
	}
</script>

<form
	class="flex flex-col gap-4 w-[500px] justify-center items-center"
	on:submit|preventDefault={findUserByEmail}
>
	<h3 class="font-rubik text-2xl text-dark-slate text-center font-bold">ADD A NEW FRIEND</h3>
	<input
		type="email"
		bind:value={email}
		bind:this={emailInput}
		placeholder="Find friends by their email"
		required
		class="p-2 px-4 rounded-full bg-transparent shadow-neu-inner focus:outline-light-purple w-full backdrop-"
	/>
	{#if user}
		<div class="flex justify-between items-center w-full">
			<div>
				<p class="font-bold text-lg">{user.name}</p>
				<span>{user.email}</span>
			</div>
			<button class="bg-green-500 text-white rounded px-2 py-1 shadow-neu-outter">Add Friend</button
			>
		</div>
	{:else if errorFindingUser}
		<p>{errorFindingUser}</p>
	{/if}
	<button
		type="submit"
		class="py-2 px-4 rounded-full bg-light-gray shadow-neu-outter active:shadow-neu-inner active:translate-y-1 transition"
		>Find User</button
	>
</form>
