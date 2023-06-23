<script>
	import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
	import '../style.css';
	import { setClient } from 'svelte-apollo';
	import { setContext } from '@apollo/client/link/context';

	const link = new HttpLink({
		uri: 'http://localhost:3000/graphql',
		fetch
	});

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from local storage if it exists
		const token = localStorage.getItem('@svelte-chat-1.0:access-token');
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : ''
			}
		};
	});

	const client = new ApolloClient({
		link: authLink.concat(link),
		cache: new InMemoryCache()
	});

	setClient(client);
</script>

<slot />
