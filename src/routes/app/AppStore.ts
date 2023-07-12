import { writable } from 'svelte/store';

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

interface ApplicationInterface {
	rooms: IRoom[];
	selectedRoomIndex: number | undefined;
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

function createAppStore() {
	const { subscribe, set, update } = writable<ApplicationInterface>({} as ApplicationInterface);

	const setRooms = (rooms: IRoom[]) => {
		set({ rooms: rooms, selectedRoomIndex: undefined });
	};

	const setSelectedRoomIndex = (room_id: number) => {
		update((app) => {
			const index = app.rooms.findIndex((r) => r.id === room_id);
			return {
				...app,
				selectedRoomIndex: index
			};
		});
	};

	const addMessage = ({ roomId, roomMessage }: AddMessageParams) => {
		update((app) => {
			const roomIndex = app.rooms.findIndex((r) => r.id === roomId);
			if (roomIndex !== -1) {
				const updatedRoom = {
					...app.rooms[roomIndex],
					messages: [...app.rooms[roomIndex].messages, roomMessage]
				};
				const updatedRooms = [...app.rooms];
				updatedRooms[roomIndex] = updatedRoom;
				return { ...app, rooms: updatedRooms };
			} else {
				return app;
			}
		});
	};

	return {
		subscribe,
		setRooms,
		addMessage,
		setSelectedRoomIndex
	};
}

export const AppStore = createAppStore();
