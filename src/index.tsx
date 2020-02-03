import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { auth } from "./firebase";
import { userActions } from "./actions/user";
import { rootSaga } from "./sagas";
import { signInMethodsActions } from "./actions/signInMethods";

export const store = configureStore();
store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

let justRendered = true;
auth.onAuthStateChanged(async authUser => {
  if (authUser) {
    const user = {
      id: authUser.uid,
      name: authUser.displayName,
      email: authUser.email,
      photo: authUser.photoURL
    };
    if (justRendered) {
      // if a user is authenticated and the app didn't render yet dispatch authSuccess action to run user Saga
      store.dispatch(userActions.authSuccess(false, user));
      store.dispatch(signInMethodsActions.getMethodsStart(user.email!!));
      justRendered = false;
    }
  } else {
    if (!justRendered) {
      store.dispatch(signInMethodsActions.getMethodsSuccess([]));
      store.dispatch(userActions.signOut());
    } else {
      store.dispatch(userActions.noUser());
      justRendered = false;
    }
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
