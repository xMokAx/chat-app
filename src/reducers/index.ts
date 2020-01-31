import { combineReducers } from "redux";
import { userReducer } from "./user";
import { signInMethodsReducer } from "./signInMethods";
import { chatRoomsReducer } from "./chatRooms";
import { chatMessagesReducer } from "./chatMessages";
import { activeRoomReducer } from "./activeRoom";

export const rootReducer = combineReducers({
  user: userReducer,
  signInMethods: signInMethodsReducer,
  chatRooms: chatRoomsReducer,
  chatMessages: chatMessagesReducer,
  activeRoom: activeRoomReducer
});
