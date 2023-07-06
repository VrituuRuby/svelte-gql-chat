import { browser } from '$app/environment';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: 'http://localhost:3000/graphql'
});

const client = (token?: string | null) => {
	console.log('Now using token', token);

	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : ''
			}
		};
	});
	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache()
	});
};

export default client;
