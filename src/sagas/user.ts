import { call, put, takeLatest, delay, take } from "redux-saga/effects";
import { createHash } from "crypto";
import {
  userActions,
  AUTH_SUCCESS,
  AuthSuccessAction,
  AddUserAction,
  User,
  ADD_USER
} from "../actions/user";
import { userApi } from "../firebase";
import { eventChannel } from "redux-saga";

const emailHash = (email: string) =>
  createHash("md5")
    .update(email)
    .digest("hex");

function* addUser(action: AuthSuccessAction) {
  if (action.isNewUser) {
    // sign up
    try {
      // add user to firestore
      if (!action.user.photo) {
        action.user.photo = `https://www.gravatar.com/avatar/${emailHash(
          action.user.email!!
        )}?s=200&r=pg&d=identicon`;
      }
      yield call(userApi.addUser, action.user.id, {
        createdRooms: [],
        joinedRooms: [],
        ...action.user
      });
      // add user to redux store
      yield put(userActions.addUser(action.user));
    } catch (error) {
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

        yield put(userActions.addUser(doc.data()));
      } else {
        // if doc doesn't exits for whatever reason
        // rerun the saga to dispatch authSuccess with isNewUser true to add the doc
        yield put(userActions.authSuccess(true, action.user));
      }
    } catch (error) {
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

export function* watchAddUser() {
  yield takeLatest(AUTH_SUCCESS, addUser);
}

function* updateUser(action: AddUserAction) {
  const channel = eventChannel(emit =>
    userApi.user(action.user.id).onSnapshot(userDoc => {
      const user = userDoc.data();
      emit(userActions.updateUser(user as User));
    })
  );

  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } catch (err) {
    // yield put(errorAction(err))
  }
}

export function* watchUpdateUser() {
  yield takeLatest(ADD_USER, updateUser);
}
