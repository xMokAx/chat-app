import { combineReducers } from "redux";
import { userReducer } from "./user";
import { signInMethodsReducer } from "./signInMethods";
import { ChatRoomsByTypeReducer } from "./chatRooms";
import { chatMessagesByRoomReducer } from "./chatMessages";
import { peopleByRoomReducer } from "./people";

export const rootReducer = combineReducers({
  user: userReducer,
  signInMethods: signInMethodsReducer,
  chatRooms: ChatRoomsByTypeReducer,
  chatMessages: chatMessagesByRoomReducer,
  people: peopleByRoomReducer
});
