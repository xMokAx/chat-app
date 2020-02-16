import {
  userActions,
  ADD_USER,
  User,
  UserActionTypes,
  UPDATE_USER,
  AUTH_SUCCESS,
  NO_USER,
  SIGN_OUT,
  AUTH_FAILURE
} from "../user";

describe("user actions", () => {
  it("should create an action to remove loading indicator at initial app start when there is no authenticated user", () => {
    const expectedAction: UserActionTypes = {
      type: NO_USER
    };
    expect(userActions.noUser()).toEqual(expectedAction);
  });

  it("should create an action to start addUser saga", () => {
    const user: User = {
      id: "123",
      photo: null,
      email: "test@gmail.com"
    };
    const expectedAction: UserActionTypes = {
      type: AUTH_SUCCESS,
      isNewUser: true,
      user
    };
    expect(userActions.authSuccess(true, user)).toEqual(expectedAction);
  });

  it("should create an action with an error when fetching user fails", () => {
    const error = "get user failure";
    const expectedAction: UserActionTypes = {
      type: AUTH_FAILURE,
      error
    };
    expect(userActions.authFailure(error)).toEqual(expectedAction);
  });

  it("should create an action to add the user", () => {
    const user: User = {
      id: "123",
      photo: null,
      email: "test@gmail.com"
    };
    const expectedAction: UserActionTypes = {
      type: ADD_USER,
      user
    };
    expect(userActions.addUser(user)).toEqual(expectedAction);
  });

  it("should create an action to update the user", () => {
    const user: User = {
      id: "123",
      photo: "new photo"
    };
    const expectedAction: UserActionTypes = {
      type: UPDATE_USER,
      user
    };
    expect(userActions.updateUser(user)).toEqual(expectedAction);
  });

  it("should create an action to reset the user state", () => {
    const expectedAction: UserActionTypes = {
      type: SIGN_OUT
    };
    expect(userActions.signOut()).toEqual(expectedAction);
  });
});
