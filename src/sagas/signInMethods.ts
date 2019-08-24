import { call, put, takeLatest } from "redux-saga/effects";
import {
  signInMethodsActions,
  GET_METHODS_START,
  GetMethodsStartAction
} from "../actions/signInMethods";
import { authApi } from "../firebase";

function* signInMethods(action: GetMethodsStartAction) {
  try {
    const signInMethods = yield call(authApi.getSignInMethods, action.email);
    console.log("sign in methods: ", signInMethods);
    yield put(signInMethodsActions.getMethodsSuccess(signInMethods));
  } catch (e) {
    console.log(e);
    yield put(signInMethodsActions.getMethodsFailure(e.message));
  }
}

export function* watchSignInMethods() {
  yield takeLatest(GET_METHODS_START, signInMethods);
}
