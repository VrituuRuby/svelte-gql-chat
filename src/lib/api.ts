import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:3000/graphql';

export const client = new GraphQLClient(endpoint);

export function setToken(token: string) {
	client.setHeader('Authorization', `Bearer ${token}`);
}
