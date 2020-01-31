import { User } from "./user";

export const SET_ACTIVE_ROOM = "SET_ACTIVE_ROOM";
export const ADD_PERSON = "ADD_PERSON";
export const UPDATE_PERSON = "UPDATE_PERSON";
export const DELETE_PERSON = "DELETE_PERSON";

export type Person = Pick<User, "id" | "name" | "photo">;

export interface SetActiveRoomAction {
  type: typeof SET_ACTIVE_ROOM;
  id: string;
}

export interface AddPersonAction {
  type: typeof ADD_PERSON;
  person: Person;
}

export interface UpdatePersonAction {
  type: typeof UPDATE_PERSON;
  person: Partial<Person>;
}

export interface DeletePersonAction {
  type: typeof DELETE_PERSON;
  id: string;
}

export type ActiveRoomActionTypes =
  | SetActiveRoomAction
  | AddPersonAction
  | UpdatePersonAction
  | DeletePersonAction;

const setActiveRoom = (id: string): ActiveRoomActionTypes => ({
  type: SET_ACTIVE_ROOM,
  id
});

const addPerson = (person: Person): ActiveRoomActionTypes => ({
  type: ADD_PERSON,
  person
});

const updatePerson = (person: Partial<Person>): ActiveRoomActionTypes => ({
  type: UPDATE_PERSON,
  person
});

const deletePerson = (id: string): ActiveRoomActionTypes => ({
  type: DELETE_PERSON,
  id
});

export const activeRoomActions = {
  setActiveRoom,
  addPerson,
  updatePerson,
  deletePerson
};
