import { call, put, takeLatest, delay } from "redux-saga/effects";
import { userActions, AUTH_SUCCESS, AuthSuccessAction } from "../actions/user";
import { userApi } from "../firebase";

function* user(action: AuthSuccessAction) {
  if (action.isNewUser) {
    // sign up
    try {
      // add user to firestore
      const response = yield call(userApi.addUser, action.user.id, action.user);
      console.log("add user response: ", response); // undefined
      // add user to redux store
      yield put(userActions.addUser(action.user));
    } catch (error) {
      console.log(error);
      yield put(
        userActions.authFailure(
          "You signed up sccessfully but we failed to automatically sign you in, please fix your connection. Retrying..."
        )
      );
      yield delay(3000);
      yield put(userActions.authSuccess(true, action.user));
    }
  } else {
    // sign in
    try {
      // get user from firestore
      const doc = yield call(userApi.getUser, action.user.id);

      if (doc.exists) {
        // add user to redux store
        console.log("users doc exists: ", doc);

        yield put(userActions.addUser(doc.data()));
      } else {
        // if doc doesn't exits for whatever reason
        // rerun the saga to dispatch authSuccess with isNewUser true to add the doc
        yield put(userActions.authSuccess(true, action.user));
      }
    } catch (error) {
      console.log(error);
      // network failure
      yield put(
        userActions.authFailure(
          "Failed to get user info, please fix your connection. Retrying..."
        )
      );
      yield delay(3000);
      yield put(userActions.authSuccess(false, action.user));
    }
  }
}

export function* watchUser() {
  yield takeLatest(AUTH_SUCCESS, user);
}
