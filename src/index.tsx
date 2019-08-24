import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { auth } from "./firebase";
import { userActions } from "./actions/user";
import LoadingPage from "./components/LoadingPage";
import { rootSaga } from "./sagas";

export const store = configureStore();
store.runSaga(rootSaga);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    console.log("will render the app");
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("root"));

auth.onAuthStateChanged(async authUser => {
  if (authUser) {
    console.log("auth change user: ", authUser);
    const user = {
      id: authUser.uid,
      name: authUser.displayName,
      email: authUser.email,
      photo: authUser.photoURL
    };
    if (!hasRendered) {
      console.log("user is already authenticated");
      // if a user is authenticated and the app didn't render yet dispatch authSuccess action to run user Saga
      store.dispatch(userActions.authSuccess(false, user));
    }
    renderApp();
  } else {
    if (hasRendered) {
      console.log("no user and the app is rendered will dispatch signOut");
      store.dispatch(userActions.signOut());
    }
    renderApp();
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
