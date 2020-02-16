export const GET_ROOMS_START = "GET_ROOMS_START";
export const GET_ROOMS_BY_QUERY_START = "GET_ROOMS_BY_QUERY_START";
export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAILURE = "GET_ROOMS_FAILURE";
export const ADD_ROOM = "ADD_ROOM";
export const UPDATE_ROOM = "UPDATE_ROOM";
export const DELETE_ROOM = "DELETE_ROOM";
export const SET_TEXT_FILTER = "SET_TEXT_FILTER";
export const RECENT_ROOMS = "RECENT_ROOMS";
export const MY_ROOMS = "MY_ROOMS";
export const QUERY_ROOMS = "QUERY_ROOMS";
export const SET_ROOMS_TYPE = "SET_ROOMS_TYPE";
export const SET_ACTIVE_ROOM = "SET_ACTIVE_ROOM";

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
  creator: {
    id: string;
    name: string;
  };
  people: string[];
}

export type Rooms = Room[];

export type RoomsType =
  | typeof RECENT_ROOMS
  | typeof MY_ROOMS
  | typeof QUERY_ROOMS;

export interface GetRoomsStartAction {
  type: typeof GET_ROOMS_START;
  roomsType: RoomsType;
}

export interface GetRoomsByQueryStart {
  type: typeof GET_ROOMS_BY_QUERY_START;
  roomsType: typeof QUERY_ROOMS;
  query: string;
}

export interface GetRoomsSuccessAction {
  type: typeof GET_ROOMS_SUCCESS;
  rooms: Rooms;
  roomsType: RoomsType;
}

export interface GetRoomsFailureAction {
  type: typeof GET_ROOMS_FAILURE;
  error: string;
  roomsType: RoomsType;
}

export interface AddRoomAction {
  type: typeof ADD_ROOM;
  room: Room;
  roomsType: RoomsType;
}

export interface UpdateRoomAction {
  type: typeof UPDATE_ROOM;
  room: Room;
  roomsType: RoomsType;
}

export interface DeleteRoomAction {
  type: typeof DELETE_ROOM;
  id: string;
  roomsType: RoomsType;
}

export interface SetTextFilterAction {
  type: typeof SET_TEXT_FILTER;
  textFilter: string;
  roomsType: RoomsType;
}

export interface SetRoomsTypeAction {
  type: typeof SET_ROOMS_TYPE;
  roomsType: RoomsType;
}

export interface SetActiveRoomAction {
  type: typeof SET_ACTIVE_ROOM;
  id: string;
}

export type ChatRoomsActionTypes =
  | GetRoomsStartAction
  | GetRoomsByQueryStart
  | GetRoomsSuccessAction
  | GetRoomsFailureAction
  | AddRoomAction
  | UpdateRoomAction
  | DeleteRoomAction
  | SetTextFilterAction
  | SetRoomsTypeAction
  | SetActiveRoomAction;

const getRoomsStart = (roomsType: RoomsType): ChatRoomsActionTypes => ({
  type: GET_ROOMS_START,
  roomsType
});

const getRoomsByQueryStart = (query: string): ChatRoomsActionTypes => ({
  type: GET_ROOMS_BY_QUERY_START,
  roomsType: QUERY_ROOMS,
  query
});

const getRoomsSuccess = (
  rooms: Rooms,
  roomsType: RoomsType
): ChatRoomsActionTypes => ({
  type: GET_ROOMS_SUCCESS,
  rooms,
  roomsType
});

const getRoomsFailure = (
  error: string,
  roomsType: RoomsType
): ChatRoomsActionTypes => ({
  type: GET_ROOMS_FAILURE,
  error,
  roomsType
});

const addRoom = (room: Room, roomsType: RoomsType): ChatRoomsActionTypes => ({
  type: ADD_ROOM,
  room,
  roomsType
});

const updateRoom = (
  room: Room,
  roomsType: RoomsType
): ChatRoomsActionTypes => ({
  type: UPDATE_ROOM,
  room,
  roomsType
});

const deleteRoom = (
  id: string,
  roomsType: RoomsType
): ChatRoomsActionTypes => ({
  type: DELETE_ROOM,
  id,
  roomsType
});

const setTextFilter = (
  textFilter: string,
  roomsType: RoomsType
): ChatRoomsActionTypes => ({
  type: SET_TEXT_FILTER,
  textFilter,
  roomsType
});

const setRoomsType = (roomsType: RoomsType): ChatRoomsActionTypes => ({
  type: SET_ROOMS_TYPE,
  roomsType
});

const setActiveRoom = (id: string): ChatRoomsActionTypes => ({
  type: SET_ACTIVE_ROOM,
  id
});

export const chatRoomsActions = {
  getRoomsStart,
  getRoomsByQueryStart,
  getRoomsSuccess,
  getRoomsFailure,
  addRoom,
  updateRoom,
  deleteRoom,
  setTextFilter,
  setRoomsType,
  setActiveRoom
};
