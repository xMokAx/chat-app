import {
  ADD_USER,
  UPDATE_USER,
  SIGN_OUT,
  UserActionTypes,
  User,
  AUTH_FAILURE,
  AUTH_SUCCESS
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
  isLoading: false,
  error: ""
};

export const userReducer = (
  state: UserState = initialUserState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...initialUserState,
        userInfo: action.user
      };
    case UPDATE_USER:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.user
        }
      };
    case AUTH_SUCCESS:
      return {
        ...initialUserState,
        isLoading: true
      };
    case AUTH_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case SIGN_OUT:
      return initialUserState;
    default:
      return state;
  }
};
