export const NO_USER = "NO_USER";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const SIGN_OUT = "SIGN_OUT";

// the user properties types can be string, undefined when the app start with empty
// state or null when assigned to firebase empty user properties.
export type User = {
  // [key: string]: string | null | undefined | boolean;
  id: string;
  name?: string | null;
  email?: string | null;
  photo?: string | null;
};

export interface NoUserAction {
  type: typeof NO_USER;
}

export interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS;
  isNewUser: boolean;
  user: User;
}

export interface AuthFailureAction {
  type: typeof AUTH_FAILURE;
  error: string;
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
}

export interface AddUserAction {
  type: typeof ADD_USER;
  user: User;
}

export interface UpdateUserAction {
  type: typeof UPDATE_USER;
  user: Omit<User, "id">;
}

export type UserActionTypes =
  | NoUserAction
  | AuthSuccessAction
  | AuthFailureAction
  | SignOutAction
  | AddUserAction
  | UpdateUserAction;

const noUser = (): UserActionTypes => ({
  type: NO_USER
});

const authSuccess = (isNewUser: boolean, user: User): UserActionTypes => ({
  type: AUTH_SUCCESS,
  isNewUser,
  user
});

const authFailure = (error: string): UserActionTypes => ({
  type: AUTH_FAILURE,
  error
});

const signOut = (): UserActionTypes => ({
  type: SIGN_OUT
});

const addUser = (user: User): UserActionTypes => ({
  type: ADD_USER,
  user
});

const updateUser = (user: Omit<User, "id">): UserActionTypes => ({
  type: UPDATE_USER,
  user
});

export const userActions = {
  noUser,
  authSuccess,
  authFailure,
  signOut,
  addUser,
  updateUser
};
