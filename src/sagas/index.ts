import { fork, all } from "redux-saga/effects";
import { watchAddUser, watchUpdateUser } from "./user";
import { watchSignInMethods } from "./signInMethods";
import { watchChatRooms, watchChatRoomsByQuery } from "./chatRooms";
import { watchChatMessages } from "./chatMessages";
import { watchActiveRoomPeople } from "./people";

export const rootSaga = function* root() {
  yield all([
    fork(watchAddUser),
    fork(watchUpdateUser),
    fork(watchSignInMethods),
    fork(watchChatRooms),
    fork(watchChatRoomsByQuery),
    fork(watchChatMessages),
    fork(watchActiveRoomPeople)
  ]);
};
