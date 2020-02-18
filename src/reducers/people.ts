import {
  ADD_PERSON,
  UPDATE_PERSON,
  DELETE_PERSON,
  Person,
  PeopleActionTypes
} from "../actions/people";
import { AppState } from "../store/configureStore";

export type PeopleState = {
  [key: string]: Person[];
};

const initialPeopleState: PeopleState = {};

export const peopleReducer = (
  state: Person[] = [],
  action: PeopleActionTypes
): Person[] => {
  switch (action.type) {
    case ADD_PERSON:
      return [...state, action.person];
    case UPDATE_PERSON:
      return state.map(p => {
        if (p.id === action.person.id) {
          return {
            ...p,
            ...action.person
          };
        } else {
          return p;
        }
      });
    case DELETE_PERSON:
      return state.filter(p => p.id !== action.id);

    default:
      return state;
  }
};

export const peopleByRoomReducer = (
  state = initialPeopleState,
  action: PeopleActionTypes
): PeopleState => {
  switch (action.type) {
    case ADD_PERSON:
    case UPDATE_PERSON:
    case DELETE_PERSON:
      return {
        ...state,
        [action.roomId]: peopleReducer(state[action.roomId], action)
      };

    default:
      return state;
  }
};

export const getPerson = (state: AppState, id: string) =>
  state.people[state.chatRooms.activeRoomId]
    ? state.people[state.chatRooms.activeRoomId].find(p => p.id === id)
    : undefined;

export const getPeopleCount = (state: PeopleState, roomId: string) =>
  state[roomId].length;
