import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:3000/graphql';

export const client = new GraphQLClient(endpoint);

export const tokenKey = '@svelte-chat-1.1.0:access-token';
