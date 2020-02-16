import {
  GET_ROOMS_START,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
  ChatRoomsActionTypes,
  Rooms,
  ADD_ROOM,
  DELETE_ROOM,
  UPDATE_ROOM,
  SET_TEXT_FILTER,
  RECENT_ROOMS,
  MY_ROOMS,
  QUERY_ROOMS,
  SET_ROOMS_TYPE,
  RoomsType,
  GET_ROOMS_BY_QUERY_START,
  SET_ACTIVE_ROOM
} from "../actions/chatRooms";

export type ChatRoomsState = {
  isLoading: boolean;
  error: string;
  textFilter: string;
  rooms: Rooms;
};

const initialChatRoomState: ChatRoomsState = {
  isLoading: false,
  error: "",
  textFilter: "",
  rooms: []
};

export type ChatRoomsByTypeState = {
  activeRoomId: string;
  roomsType: RoomsType;
  [RECENT_ROOMS]: ChatRoomsState;
  [MY_ROOMS]: ChatRoomsState;
  [QUERY_ROOMS]: ChatRoomsState;
};

const initialChatRoomsByTypeState = {
  activeRoomId: "",
  roomsType: MY_ROOMS,
  [RECENT_ROOMS]: initialChatRoomState,
  [MY_ROOMS]: initialChatRoomState,
  [QUERY_ROOMS]: initialChatRoomState
};

const chatRoomsReducer = (
  state = initialChatRoomState,
  action: ChatRoomsActionTypes
): ChatRoomsState => {
  switch (action.type) {
    case GET_ROOMS_START:
      return {
        ...initialChatRoomState,
        isLoading: true
      };
    case GET_ROOMS_BY_QUERY_START:
      return {
        ...initialChatRoomState,
        isLoading: true
      };
    case GET_ROOMS_SUCCESS:
      return {
        ...initialChatRoomState,
        rooms: action.rooms
      };
    case GET_ROOMS_FAILURE:
      return {
        ...initialChatRoomState,
        error: action.error
      };
    case ADD_ROOM:
      return {
        ...state,
        isLoading: false,
        error: "",
        rooms: [action.room, ...state.rooms]
      };
    case UPDATE_ROOM:
      return {
        ...state,
        rooms: state.rooms.map(r => {
          if (r.id === action.room.id) {
            return {
              ...r,
              ...action.room
            };
          } else {
            return r;
          }
        })
      };
    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter(r => r.id !== action.id)
      };
    case SET_TEXT_FILTER:
      return {
        ...state,
        textFilter: action.textFilter
      };

    default:
      return state;
  }
};

export const ChatRoomsByTypeReducer = (
  state = initialChatRoomsByTypeState,
  action: ChatRoomsActionTypes
): ChatRoomsByTypeState => {
  switch (action.type) {
    case GET_ROOMS_START:
    case GET_ROOMS_BY_QUERY_START:
    case GET_ROOMS_SUCCESS:
    case GET_ROOMS_FAILURE:
    case ADD_ROOM:
    case UPDATE_ROOM:
    case DELETE_ROOM:
    case SET_TEXT_FILTER:
      return {
        ...(state as ChatRoomsByTypeState),
        [action.roomsType]: chatRoomsReducer(state[action.roomsType], action)
      };
    case SET_ROOMS_TYPE:
      return {
        ...state,
        roomsType: action.roomsType
      };
    case SET_ACTIVE_ROOM:
      return {
        ...(state as ChatRoomsByTypeState),
        activeRoomId: action.id
      };
    default:
      return state as ChatRoomsByTypeState;
  }
};

export const getActiveRoom = (state: ChatRoomsByTypeState) =>
  state[state.roomsType].rooms.find(r => r.id === state.activeRoomId) ||
  state[MY_ROOMS].rooms.find(r => r.id === state.activeRoomId);

const getRooms = (state: ChatRoomsState) => state.rooms;
const getTextFilter = (state: ChatRoomsState) => state.textFilter;

export const getFilteredRooms = (state: ChatRoomsState): Rooms => {
  const rooms = getRooms(state);
  const textFilter = getTextFilter(state);
  return rooms.filter(room =>
    room.name.toLowerCase().includes(textFilter.toLowerCase())
  );
};
