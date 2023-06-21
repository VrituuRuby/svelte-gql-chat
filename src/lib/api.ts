import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:3000/graphql';

let client: GraphQLClient | null = null;

export function getClient(): GraphQLClient {
	if (!client) {
		client = new GraphQLClient(endpoint);
		return client;
	}
	return client;
}
