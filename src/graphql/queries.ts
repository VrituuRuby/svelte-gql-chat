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

export const SEND_MESSAGE = gql`
	mutation sendMessage($data: CreateMessageInput!) {
		createMessage(data: $data) {
			text
			createdAt
			user_id
			room_id
			room {
				name
				id
			}
			user {
				name
			}
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
				users {
					id
					name
				}
				id
				name
				messages {
					text
					user_id
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

export const SUBSCRIBE_TO_MESSAGES = gql`
	subscription RoomsMessages($data: Int!) {
		roomMessages(user_id: $data) {
			id
			text
			createdAt
			user_id
			user {
				name
			}
		}
	}
`;
