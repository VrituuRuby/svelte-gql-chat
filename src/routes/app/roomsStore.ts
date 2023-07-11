import { writable } from 'svelte/store';
import { RoomsMessages } from '../../generated/generated';

export interface IRoom {
	id: number;
	name: string;
	messages: {
		id: number;
		createdAt: Date;
		text: string;
		room_id?: number;
		user_id: number;
		user: {
			id?: number;
			name: string;
		};
	}[];
	users: {
		id: number;
		name: string;
	}[];
}

interface IMessage {
	id: number;
	createdAt: Date;
	text: string;
	room_id?: number;
	user_id: number;
	user: {
		id?: number;
		name: string;
	};
}

interface AddMessageParams {
	roomId: number;
	roomMessage: IMessage;
}

function createRooms() {
	const { subscribe, set, update } = writable<IRoom[]>([]);

	const setRooms = (rooms: IRoom[]) => {
		set(rooms);
	};

	const addMessage = ({ roomId, roomMessage }: AddMessageParams) => {
		update((rooms) => {
			const roomIndex = rooms.findIndex((r) => r.id === roomId);
			if (roomIndex !== -1) {
				const updatedRoom = {
					...rooms[roomIndex],
					messages: [...rooms[roomIndex].messages, roomMessage]
				};
				const updatedRooms = [...rooms];
				updatedRooms[roomIndex] = updatedRoom;
				return updatedRooms;
			} else {
				return rooms;
			}
		});
	};

	return {
		subscribe,
		setRooms,
		addMessage
	};
}

export const rooms = createRooms();
