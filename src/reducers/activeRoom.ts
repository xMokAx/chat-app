import { User } from "../actions/user";
import {
  ActiveRoomActionTypes,
  ADD_PERSON,
  UPDATE_PERSON,
  DELETE_PERSON,
  SET_ACTIVE_ROOM
} from "../actions/activeRoom";
import { AppState } from "../store/configureStore";

export type ActiveRoomState = {
  activeRoomId: string;
  people: Pick<User, "id" | "name" | "photo">[];
};

const initialActiveRoomState: ActiveRoomState = {
  activeRoomId: "",
  people: []
};

export const activeRoomReducer = (
  state = initialActiveRoomState,
  action: ActiveRoomActionTypes
): ActiveRoomState => {
  switch (action.type) {
    case ADD_PERSON:
      return {
        ...state,
        people: [...state.people, action.person]
      };
    case UPDATE_PERSON:
      return {
        ...state,
        people: state.people.map(p => {
          if (p.id === action.person.id) {
            return {
              ...p,
              ...action.person
            };
          } else {
            return p;
          }
        })
      };
    case DELETE_PERSON:
      return {
        ...state,
        people: state.people.filter(p => p.id !== action.id)
      };
    case SET_ACTIVE_ROOM:
      return {
        ...initialActiveRoomState,
        activeRoomId: action.id
      };
    default:
      return state;
  }
};

export const getActiveRoom = (state: AppState) =>
  state.chatRooms.rooms.find(r => r.id === state.activeRoom.activeRoomId);

export const getPerson = (state: ActiveRoomState, id: string) =>
  state.people.find(p => p.id === id);

export const getPeopleCount = (state: ActiveRoomState) => state.people.length;
