import gql from 'graphql-tag';

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
		createUser(data: $data) {
			id
			name
			createdAt
			permissions
		}
	}
`;

export const GET_MESSAGES = gql`
	query userData {
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
					}
				}
			}
		}
	}
`;
