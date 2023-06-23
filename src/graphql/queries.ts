import { gql } from '@apollo/client/core';

export const SIGN_IN = gql`
	mutation signIn($data: AuthInput!) {
		signIn(data: $data) {
			token
		}
	}
`;

export const GET_USERS = gql`
	query getUsers {
		users {
			name
			id
			createdAt
		}
	}
`;

export const SIGN_UP = gql`
	mutation ($data: CreateUserInput!) {
		register(data: $data) {
			id
			name
			createdAt
			permissions
		}
	}
`;

export const GET_USER_DATA = gql`
	query {
		user {
			id
			name
			email
			createdAt
			rooms {
				id
				name
				messages {
					text
					createdAt
					user {
						name
						id
					}
				}
			}
		}
	}
`;
