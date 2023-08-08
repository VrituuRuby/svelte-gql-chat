<script lang="ts">
	import { onMount } from 'svelte';
	import client from '../../../client';
	import {
		type ListFriendsQuery,
		ListFriendsDoc,
		CreateRoomDoc,
		type CreateRoomMutation
	} from '../../../generated/generated';
	import { tokenKey } from '$lib/api';

	interface IFriendsUser {
		id: number;
		name: string;
		email: string;
	}

	let nameInput: HTMLElement;
	let name = '';

	let friends: IFriendsUser[] | undefined | null;

	let selectedFriendsIds: number[] = [];

	onMount(async () => {
		nameInput.focus();
		friends = await listFriends();
	});

	async function handleCreateNewRoom() {
		if (name.trim().length <= 0) {
			throw Error('Room must have a name');
		}
		const token = localStorage.getItem(tokenKey);
		const api = client(token);

		const room = await api.mutate<CreateRoomMutation>({
			mutation: CreateRoomDoc,
			variables: { data: { name: name.trim(), users_ids: selectedFriendsIds } }
		});
	}

	async function listFriends() {
		const token = localStorage.getItem(tokenKey);
		const api = client(token);

		const data = await api.query<ListFriendsQuery>({ query: ListFriendsDoc });

		if (data.data) {
			return data.data.user.friends;
		}

		return undefined;
	}

	function toogleFriendSelected(id: number) {
		if (selectedFriendsIds.includes(id)) {
			selectedFriendsIds = selectedFriendsIds.filter((friend) => friend !== id);
		} else {
			selectedFriendsIds = [...selectedFriendsIds, id];
		}
	}
</script>

<form
	class="flex flex-col gap-4 w-[500px] justify-center items-center"
	on:submit|preventDefault={handleCreateNewRoom}
>
	<h3 class="font-rubik text-2xl text-dark-slate text-center font-bold">
		CREATE A NEW CHATTING ROOM
	</h3>
	<input
		type="text"
		bind:this={nameInput}
		bind:value={name}
		placeholder="Room name"
		required
		class="p-2 px-4 rounded-full bg-transparent shadow-neu-inner focus:outline-light-purple w-full backdrop-"
	/>
	<ul class="flex w-full">
		{#if friends}
			{#each friends as friend}
				<li class="flex text-slight-black items-center gap-2">
					<input type="checkbox" on:change={() => toogleFriendSelected(friend.id)} />
					<div class="flex flex-col">
						<p class="font-bold">{friend.name}</p>
						<p>{friend.email}</p>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
	<button
		type="submit"
		class="py-2 px-4 rounded-full bg-light-gray shadow-neu-outter active:shadow-neu-inner active:translate-y-1 transition"
		>Create</button
	>
</form>
