import {
  GET_ROOMS_START,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
  ChatRoomsActionTypes,
  Rooms,
  ADD_ROOM,
  DELETE_ROOM,
  UPDATE_ROOM,
  SET_TEXT_FILTER
} from "../actions/chatRooms";

export type ChatRoomsState = {
  isLoading: boolean;
  error: string;
  textFilter: string;
  rooms: Rooms;
  activeRoomId: string;
};

const initialChatRoomState: ChatRoomsState = {
  isLoading: false,
  error: "",
  textFilter: "",
  rooms: [],
  activeRoomId: ""
};

export const chatRoomsReducer = (
  state = initialChatRoomState,
  action: ChatRoomsActionTypes
): ChatRoomsState => {
  switch (action.type) {
    case GET_ROOMS_START:
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

const getRooms = (state: ChatRoomsState) => state.rooms;
const getTextFilter = (state: ChatRoomsState) => state.textFilter;

export const getFilteredRooms = (state: ChatRoomsState): Rooms => {
  const rooms = getRooms(state);
  const textFilter = getTextFilter(state);
  return rooms.filter(room =>
    room.name.toLowerCase().includes(textFilter.toLowerCase())
  );
};
