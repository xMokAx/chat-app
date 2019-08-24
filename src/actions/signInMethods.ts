export const GET_METHODS_START = "GET_METHODS_START";
export const GET_METHODS_SUCCESS = "GET_METHODS_SUCCESS";
export const GET_METHODS_FAILURE = "GET_METHODS_FAILURE";
export const ADD_METHOD = "ADD_METHOD";
export const REMOVE_METHOD = "REMOVE_METHOD";

export interface GetMethodsStartAction {
  type: typeof GET_METHODS_START;
  email: string;
}

export interface GetMethodsSuccessAction {
  type: typeof GET_METHODS_SUCCESS;
  signInMethods: string[];
}

export interface GetMethodsFailureAction {
  type: typeof GET_METHODS_FAILURE;
  error: string;
}

export interface AddMethodAction {
  type: typeof ADD_METHOD;
  method: string;
}

export interface RemoveMethodAction {
  type: typeof REMOVE_METHOD;
  method: string;
}

export type SignInMethodsActionTypes =
  | GetMethodsStartAction
  | GetMethodsSuccessAction
  | GetMethodsFailureAction
  | AddMethodAction
  | RemoveMethodAction;

const getMethodsStart = (email: string): SignInMethodsActionTypes => ({
  type: GET_METHODS_START,
  email
});

const getMethodsSuccess = (
  signInMethods: string[]
): SignInMethodsActionTypes => ({
  type: GET_METHODS_SUCCESS,
  signInMethods
});

const getMethodsFailure = (error: string): SignInMethodsActionTypes => ({
  type: GET_METHODS_FAILURE,
  error
});

const addMethod = (method: string): SignInMethodsActionTypes => ({
  type: ADD_METHOD,
  method
});

const removeMethod = (method: string): SignInMethodsActionTypes => ({
  type: REMOVE_METHOD,
  method
});

export const signInMethodsActions = {
  getMethodsStart,
  getMethodsSuccess,
  getMethodsFailure,
  addMethod,
  removeMethod
};
