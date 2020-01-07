import { createHash } from "crypto";
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

const emailHash = (email: string) =>
  createHash("md5")
    .update(email)
    .digest("hex");

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
      if (!action.user.photo) {
        action.user.photo = `https://www.gravatar.com/avatar/${emailHash(
          action.user.email!!
        )}?s=400&r=pg&d=identicon`;
      }
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
      if (state.error) {
        return state;
      }
      return {
        ...state,
        isLoading: true
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
