import { call, put, takeLatest, delay } from "redux-saga/effects";
import {
  signInMethodsActions,
  GET_METHODS_START,
  GetMethodsStartAction
} from "../actions/signInMethods";
import { authApi } from "../firebase";

function* signInMethods(action: GetMethodsStartAction) {
  try {
    const signInMethods = yield call(authApi.getSignInMethods, action.email);
    yield put(signInMethodsActions.getMethodsSuccess(signInMethods));
  } catch (e) {
    yield put(
      signInMethodsActions.getMethodsFailure(
        e.message + " Please fix your connection. Retrying..."
      )
    );
    yield delay(3000);
    yield put(action);
  }
}

export function* watchSignInMethods() {
  yield takeLatest(GET_METHODS_START, signInMethods);
}
