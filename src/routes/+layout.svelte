<script>
	import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core';
	import '../style.css';
	import { setClient } from 'svelte-apollo';
	import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
	import { setContext } from '@apollo/client/link/context';
	import { createClient } from 'graphql-ws';
	import { getMainDefinition } from '@apollo/client/utilities';

	const httpLink = new HttpLink({
		uri: 'http://localhost:3000/graphql',
		fetch
	});

	const wsLink =
		typeof window !== 'undefined'
			? new GraphQLWsLink(
					createClient({
						url: 'ws://localhost:3000/graphql'
					})
			  )
			: null;

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
		link:
			typeof window !== 'undefined' && wsLink != null
				? split(
						({ query }) => {
							const definition = getMainDefinition(query);
							return (
								definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
							);
						},
						wsLink,
						authLink.concat(httpLink)
				  )
				: authLink.concat(httpLink),
		cache: new InMemoryCache()
	});

	setClient(client);
</script>

<slot />
