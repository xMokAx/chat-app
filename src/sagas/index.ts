import { fork, all } from "redux-saga/effects";
import { watchUser } from "./user";
import { watchSignInMethods } from "./signInMethods";

export const rootSaga = function* root() {
  const [task1, task2] = yield all([fork(watchUser), fork(watchSignInMethods)]);
  console.log(task1, task2);
};
