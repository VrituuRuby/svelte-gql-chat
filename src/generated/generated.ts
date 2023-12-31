import client from "../client";
import type {
        ApolloQueryResult, ObservableQuery, WatchQueryOptions, QueryOptions, MutationOptions, SubscriptionOptions
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AddUsersToRoomInput = {
  room_id: Scalars['Int']['input'];
  users_ids: Array<Scalars['Int']['input']>;
};

export type AuthDto = {
  __typename?: 'AuthDTO';
  token: Scalars['String']['output'];
  user: User;
};

export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateMessageInput = {
  room_id: Scalars['Float']['input'];
  text: Scalars['String']['input'];
};

export type CreateRoomInput = {
  name: Scalars['String']['input'];
  users_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type GetMessageInput = {
  orderBy?: Scalars['String']['input'];
  room_id: Scalars['Float']['input'];
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  room: Room;
  room_id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  user: User;
  user_id: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: User;
  addUsersToRoom: Room;
  createMessage: Message;
  createRoom: Room;
  register: User;
  signIn: AuthDto;
  updateUserPermissions: UserPermissions;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['Int']['input'];
};


export type MutationAddUsersToRoomArgs = {
  data: AddUsersToRoomInput;
};


export type MutationCreateMessageArgs = {
  data: CreateMessageInput;
};


export type MutationCreateRoomArgs = {
  data: CreateRoomInput;
};


export type MutationRegisterArgs = {
  data: CreateUserInput;
};


export type MutationSignInArgs = {
  data: AuthInput;
};


export type MutationUpdateUserPermissionsArgs = {
  data: UpdateUserPermissionsInput;
};

export type Query = {
  __typename?: 'Query';
  messages: Array<Message>;
  room: Room;
  rooms: Array<Room>;
  user: User;
  userByEmail: User;
};


export type QueryMessagesArgs = {
  data: GetMessageInput;
};


export type QueryRoomArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['Int']['output'];
  isPrivate: Scalars['Boolean']['output'];
  messages: Array<Message>;
  name?: Maybe<Scalars['String']['output']>;
  users: Array<User>;
  usersPermissions: Array<UserPermissions>;
};


export type RoomMessagesArgs = {
  orderBy: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  roomsMessages: Message;
};

export type UpdateUserPermissionsInput = {
  permissions: Array<Scalars['String']['input']>;
  room_id: Scalars['Float']['input'];
  user_id: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  friends?: Maybe<Array<User>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  permissions?: Maybe<Array<Scalars['String']['output']>>;
  rooms: Array<Room>;
};

export type UserPermissions = {
  __typename?: 'UserPermissions';
  permissions: Array<Scalars['String']['output']>;
  room: Room;
  room_id: Scalars['Int']['output'];
  user: User;
  user_id: Scalars['Int']['output'];
};

export type FindUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type FindUserByEmailQuery = { __typename?: 'Query', userByEmail: { __typename?: 'User', id: number, name: string, email: string, createdAt: any, permissions?: Array<string> | null } };

export type CreateRoomMutationVariables = Exact<{
  data: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', id: number, name?: string | null, users: Array<{ __typename?: 'User', name: string }> } };

export type ListFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListFriendsQuery = { __typename?: 'Query', user: { __typename?: 'User', name: string, friends?: Array<{ __typename?: 'User', id: number, name: string, email: string }> | null } };

export type GetRoomsDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsDataQuery = { __typename?: 'Query', rooms: Array<{ __typename?: 'Room', id: number, name?: string | null, users: Array<{ __typename?: 'User', name: string, id: number }>, messages: Array<{ __typename?: 'Message', id: number, createdAt: any, text: string, user_id: number, room_id: number, user: { __typename?: 'User', name: string, id: number } }> }> };

export type FindUserQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type FindUserQuery = { __typename?: 'Query', userByEmail: { __typename?: 'User', id: number } };

export type RoomsMessagesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RoomsMessagesSubscription = { __typename?: 'Subscription', roomsMessages: { __typename?: 'Message', id: number, createdAt: any, text: string, user_id: number, room_id: number, user: { __typename?: 'User', name: string, id: number } } };

export type SendMessageMutationVariables = Exact<{
  data: CreateMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: number, text: string, createdAt: any, user_id: number, room_id: number } };

export type SignInMutationVariables = Exact<{
  data: AuthInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthDTO', token: string, user: { __typename?: 'User', id: number } } };

export type RegisterMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: number, name: string, createdAt: any, permissions?: Array<string> | null } };


export const FindUserByEmailDoc = gql`
    query findUserByEmail($email: String!) {
  userByEmail(email: $email) {
    id
    name
    email
    createdAt
    permissions
  }
}
    `;
export const CreateRoomDoc = gql`
    mutation createRoom($data: CreateRoomInput!) {
  createRoom(data: $data) {
    id
    name
    users {
      name
    }
  }
}
    `;
export const ListFriendsDoc = gql`
    query listFriends {
  user {
    name
    friends {
      id
      name
      email
    }
  }
}
    `;
export const GetRoomsDataDoc = gql`
    query getRoomsData {
  rooms {
    id
    name
    users {
      name
      id
    }
    messages(orderBy: "asc") {
      id
      createdAt
      text
      user_id
      room_id
      user {
        name
        id
      }
    }
  }
}
    `;
export const FindUserDoc = gql`
    query findUser($email: String!) {
  userByEmail(email: $email) {
    id
  }
}
    `;
export const RoomsMessagesDoc = gql`
    subscription RoomsMessages {
  roomsMessages {
    id
    createdAt
    text
    user_id
    room_id
    user {
      name
      id
    }
  }
}
    `;
export const SendMessageDoc = gql`
    mutation sendMessage($data: CreateMessageInput!) {
  createMessage(data: $data) {
    id
    text
    createdAt
    user_id
    room_id
  }
}
    `;
export const SignInDoc = gql`
    mutation signIn($data: AuthInput!) {
  signIn(data: $data) {
    token
    user {
      id
    }
  }
}
    `;
export const RegisterDoc = gql`
    mutation register($data: CreateUserInput!) {
  register(data: $data) {
    id
    name
    createdAt
    permissions
  }
}
    `;
export const findUserByEmail = (
            options: Omit<
              WatchQueryOptions<FindUserByEmailQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<FindUserByEmailQuery> & {
              query: ObservableQuery<
                FindUserByEmailQuery,
                FindUserByEmailQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: FindUserByEmailDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<FindUserByEmailQuery> & {
                query: ObservableQuery<
                  FindUserByEmailQuery,
                  FindUserByEmailQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const AsyncfindUserByEmail = (
                options: Omit<
                  QueryOptions<FindUserByEmailQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<FindUserByEmailQuery>({query: FindUserByEmailDoc, ...options})
              }
            
export const createRoom = (
            options: Omit<
              MutationOptions<any, CreateRoomMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<CreateRoomMutation, CreateRoomMutationVariables>({
              mutation: CreateRoomDoc,
              ...options,
            });
            return m;
          }
export const listFriends = (
            options: Omit<
              WatchQueryOptions<ListFriendsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<ListFriendsQuery> & {
              query: ObservableQuery<
                ListFriendsQuery,
                ListFriendsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: ListFriendsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<ListFriendsQuery> & {
                query: ObservableQuery<
                  ListFriendsQuery,
                  ListFriendsQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const AsynclistFriends = (
                options: Omit<
                  QueryOptions<ListFriendsQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<ListFriendsQuery>({query: ListFriendsDoc, ...options})
              }
            
export const getRoomsData = (
            options: Omit<
              WatchQueryOptions<GetRoomsDataQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetRoomsDataQuery> & {
              query: ObservableQuery<
                GetRoomsDataQuery,
                GetRoomsDataQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetRoomsDataDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetRoomsDataQuery> & {
                query: ObservableQuery<
                  GetRoomsDataQuery,
                  GetRoomsDataQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const AsyncgetRoomsData = (
                options: Omit<
                  QueryOptions<GetRoomsDataQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<GetRoomsDataQuery>({query: GetRoomsDataDoc, ...options})
              }
            
export const findUser = (
            options: Omit<
              WatchQueryOptions<FindUserQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<FindUserQuery> & {
              query: ObservableQuery<
                FindUserQuery,
                FindUserQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: FindUserDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<FindUserQuery> & {
                query: ObservableQuery<
                  FindUserQuery,
                  FindUserQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const AsyncfindUser = (
                options: Omit<
                  QueryOptions<FindUserQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<FindUserQuery>({query: FindUserDoc, ...options})
              }
            
export const RoomsMessages = (
            options: Omit<SubscriptionOptions<RoomsMessagesSubscriptionVariables>, "query">
          ) => {
            const q = client.subscribe<RoomsMessagesSubscription, RoomsMessagesSubscriptionVariables>(
              {
                query: RoomsMessagesDoc,
                ...options,
              }
            )
            return q;
          }
export const sendMessage = (
            options: Omit<
              MutationOptions<any, SendMessageMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<SendMessageMutation, SendMessageMutationVariables>({
              mutation: SendMessageDoc,
              ...options,
            });
            return m;
          }
export const signIn = (
            options: Omit<
              MutationOptions<any, SignInMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<SignInMutation, SignInMutationVariables>({
              mutation: SignInDoc,
              ...options,
            });
            return m;
          }
export const register = (
            options: Omit<
              MutationOptions<any, RegisterMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<RegisterMutation, RegisterMutationVariables>({
              mutation: RegisterDoc,
              ...options,
            });
            return m;
          }