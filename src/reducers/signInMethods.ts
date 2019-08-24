import {
  GET_METHODS_START,
  GET_METHODS_SUCCESS,
  GET_METHODS_FAILURE,
  SignInMethodsActionTypes,
  ADD_METHOD,
  REMOVE_METHOD
} from "../actions/signInMethods";

export type SignInMethodsState = {
  isLoading: boolean;
  error: string;
  signInMethods: string[];
};

const initialUserState: SignInMethodsState = {
  isLoading: false,
  error: "",
  signInMethods: []
};

export const signInMethodsReducer = (
  state = initialUserState,
  action: SignInMethodsActionTypes
): SignInMethodsState => {
  switch (action.type) {
    case GET_METHODS_START:
      return {
        ...initialUserState,
        isLoading: true
      };
    case GET_METHODS_SUCCESS:
      return {
        ...initialUserState,
        signInMethods: action.signInMethods
      };
    case GET_METHODS_FAILURE:
      return {
        ...initialUserState,
        error: action.error
      };
    case ADD_METHOD:
      return {
        ...state,
        signInMethods: [action.method].concat(state.signInMethods)
      };
    case REMOVE_METHOD:
      return {
        ...state,
        signInMethods: state.signInMethods.filter(m => m !== action.method)
      };
    default:
      return state;
  }
};
