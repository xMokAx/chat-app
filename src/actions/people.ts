import { User } from "./user";

export const ADD_PERSON = "ADD_PERSON";
export const UPDATE_PERSON = "UPDATE_PERSON";
export const DELETE_PERSON = "DELETE_PERSON";

export type Person = Pick<User, "id" | "name" | "photo">;

export interface AddPersonAction {
  type: typeof ADD_PERSON;
  person: Person;
  roomId: string;
}

export interface UpdatePersonAction {
  type: typeof UPDATE_PERSON;
  person: Partial<Person>;
  roomId: string;
}

export interface DeletePersonAction {
  type: typeof DELETE_PERSON;
  id: string;
  roomId: string;
}

export type PeopleActionTypes =
  | AddPersonAction
  | UpdatePersonAction
  | DeletePersonAction;

const addPerson = (person: Person, roomId: string): PeopleActionTypes => ({
  type: ADD_PERSON,
  person,
  roomId
});

const updatePerson = (
  person: Partial<Person>,
  roomId: string
): PeopleActionTypes => ({
  type: UPDATE_PERSON,
  person,
  roomId
});

const deletePerson = (id: string, roomId: string): PeopleActionTypes => ({
  type: DELETE_PERSON,
  id,
  roomId
});

export const peopleActions = {
  addPerson,
  updatePerson,
  deletePerson
};
