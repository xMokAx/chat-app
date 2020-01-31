import { fork, all } from "redux-saga/effects";
import { watchUser } from "./user";
import { watchSignInMethods } from "./signInMethods";
import { watchChatRooms } from "./chatRooms";
import { watchChatMessages } from "./chatMessages";
import { watchActiveRoomPeople } from "./activeRoom";

export const rootSaga = function* root() {
  const [task1, task2, task3, task4, task5] = yield all([
    fork(watchUser),
    fork(watchSignInMethods),
    fork(watchChatRooms),
    fork(watchChatMessages),
    fork(watchActiveRoomPeople)
  ]);
  console.log(task1, task2, task3, task4, task5);
};
