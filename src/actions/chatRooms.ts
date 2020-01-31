export const GET_ROOMS_START = "GET_ROOMS_START";
export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAILURE = "GET_ROOMS_FAILURE";
export const ADD_ROOM = "ADD_ROOM";
export const UPDATE_ROOM = "UPDATE_ROOM";
export const DELETE_ROOM = "DELETE_ROOM";
export const SET_TEXT_FILTER = "SET_TEXT_FILTER";

export interface Message {
  text: string;
  createdAt: firebase.firestore.Timestamp;
  id: string;
  senderId: string;
}

export interface Room {
  id: string;
  name: string;
  desc: string;
  createdAt: firebase.firestore.Timestamp;
  lastMessage?: Message;
  messagesCount: number;
  people: string[];
}

export type Rooms = Room[];

export interface GetRoomsStartAction {
  type: typeof GET_ROOMS_START;
}

export interface GetRoomsSuccessAction {
  type: typeof GET_ROOMS_SUCCESS;
  rooms: Rooms;
}

export interface GetRoomsFailureAction {
  type: typeof GET_ROOMS_FAILURE;
  error: string;
}

export interface AddRoomAction {
  type: typeof ADD_ROOM;
  room: Room;
}

export interface UpdateRoomAction {
  type: typeof UPDATE_ROOM;
  room: Room;
}

export interface DeleteRoomAction {
  type: typeof DELETE_ROOM;
  id: string;
}

export interface SetTextFilterAction {
  type: typeof SET_TEXT_FILTER;
  textFilter: string;
}

export type ChatRoomsActionTypes =
  | GetRoomsStartAction
  | GetRoomsSuccessAction
  | GetRoomsFailureAction
  | AddRoomAction
  | UpdateRoomAction
  | DeleteRoomAction
  | SetTextFilterAction;

const getRoomsStart = (): ChatRoomsActionTypes => ({
  type: GET_ROOMS_START
});

const getRoomsSuccess = (rooms: Rooms): ChatRoomsActionTypes => ({
  type: GET_ROOMS_SUCCESS,
  rooms
});

const getRoomsFailure = (error: string): ChatRoomsActionTypes => ({
  type: GET_ROOMS_FAILURE,
  error
});

const addRoom = (room: Room): ChatRoomsActionTypes => ({
  type: ADD_ROOM,
  room
});

const updateRoom = (room: Room): ChatRoomsActionTypes => ({
  type: UPDATE_ROOM,
  room
});

const deleteRoom = (id: string): ChatRoomsActionTypes => ({
  type: DELETE_ROOM,
  id
});

const setTextFilter = (textFilter: string): ChatRoomsActionTypes => ({
  type: SET_TEXT_FILTER,
  textFilter
});

export const chatRoomsActions = {
  getRoomsStart,
  getRoomsSuccess,
  getRoomsFailure,
  addRoom,
  updateRoom,
  deleteRoom,
  setTextFilter
};
