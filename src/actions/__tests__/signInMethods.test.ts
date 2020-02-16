import {
  signInMethodsActions,
  SignInMethodsActionTypes,
  GET_METHODS_START,
  GET_METHODS_SUCCESS,
  GET_METHODS_FAILURE,
  ADD_METHOD,
  REMOVE_METHOD
} from "../signInMethods";

describe("signInMethods actions", () => {
  it("should create and action to start signInMethods saga", () => {
    const email = "test@gmail.com";
    const expectedAction: SignInMethodsActionTypes = {
      type: GET_METHODS_START,
      email
    };

    expect(signInMethodsActions.getMethodsStart(email)).toEqual(expectedAction);
  });

  it("should create an action to add signInMethods", () => {
    const signInMethods = ["google.com", "password"];
    const expectedAction: SignInMethodsActionTypes = {
      type: GET_METHODS_SUCCESS,
      signInMethods
    };

    expect(signInMethodsActions.getMethodsSuccess(signInMethods)).toEqual(
      expectedAction
    );
  });

  it("should create an action to add an error when fetching signInMethods fails", () => {
    const error = "get signInMethods failure";
    const expectedAction: SignInMethodsActionTypes = {
      type: GET_METHODS_FAILURE,
      error
    };

    expect(signInMethodsActions.getMethodsFailure(error)).toEqual(
      expectedAction
    );
  });

  it("should create an action to add a sign in method", () => {
    const method = "google.com";
    const expectedAction: SignInMethodsActionTypes = {
      type: ADD_METHOD,
      method
    };

    expect(signInMethodsActions.addMethod(method)).toEqual(expectedAction);
  });

  it("should create an action to remove a sign in method", () => {
    const method = "google.com";
    const expectedAction: SignInMethodsActionTypes = {
      type: REMOVE_METHOD,
      method
    };

    expect(signInMethodsActions.removeMethod(method)).toEqual(expectedAction);
  });
});
