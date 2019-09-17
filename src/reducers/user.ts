import {
  ADD_USER,
  UPDATE_USER,
  SIGN_OUT,
  UserActionTypes,
  User,
  AUTH_FAILURE,
  AUTH_SUCCESS,
  NO_USER
} from "../actions/user";

export type UserState = {
  userInfo: User;
  error: string;
  isLoading: boolean;
};

const initialUserState = {
  userInfo: {
    id: "",
    name: null,
    email: null,
    photo: null
  },
  isLoading: true,
  error: ""
};

export const userReducer = (
  state: UserState = initialUserState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userInfo: action.user,
        error: "",
        isLoading: false
      };
    case UPDATE_USER:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.user
        }
      };
    case NO_USER:
      return {
        ...state,
        isLoading: false
      };
    case AUTH_SUCCESS:
      return {
        ...state
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case SIGN_OUT:
      return { ...initialUserState, isLoading: false };
    default:
      return state;
  }
};
