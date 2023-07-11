import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { createClient } from 'graphql-ws';

const client = (token?: string | null) => {
	console.log('Now using token', token);

	const httpLink = createHttpLink({
		uri: 'http://localhost:3000/graphql'
	});

	const wsLink = new GraphQLWsLink(
		createClient({
			url: 'ws://localhost:3000/graphql',
			connectionParams: {
				access_token: token || ''
			}
		})
	);

	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : ''
			}
		};
	});

	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
		},
		wsLink,
		authLink.concat(httpLink)
	);

	return new ApolloClient({
		link: splitLink,
		cache: new InMemoryCache()
	});
};

export default client;
