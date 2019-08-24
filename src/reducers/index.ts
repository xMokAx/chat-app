import { combineReducers } from "redux";
import { userReducer } from "./user";
import { signInMethodsReducer } from "./signInMethods";

export const rootReducer = combineReducers({
  user: userReducer,
  signInMethods: signInMethodsReducer
});
