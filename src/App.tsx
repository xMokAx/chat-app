import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Router } from "@reach/router";
import * as ROUTES from "./constants/routes";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import SignUpPage from "./components/SignUpPage";
import SignUpEmailPage from "./components/SignUpEmailPage";
import SignInPage from "./components/SignInPage";
import SignInEmailPage from "./components/SignInEmailPage";
import PasswordForgetPage from "./components/PasswordForgetPage";
import ChatPage from "./components/ChatPage";
import AccountPage from "./components/AccountPage";
import Profile from "./components/Profile";
import PasswordChangeForm from "./components/PasswordChangeForm";
import PasswordForgetForm from "./components/PasswordForgetForm";
import RouterPage from "./components/RouterPage";
import NotFoundPage from "./components/NotFoundPage";
import { AppState } from "./store/configureStore";

import "./App.css";

interface Props {
  userError?: string;
}

const App = ({ userError }: Props) => {
  const [isOnline, setIsOnline] = useState(true);
  const [show, setShow] = useState(false);
  useEffect(() => {
    // to show the offline message when the website is in offline mode
    if (window.navigator.onLine === false) {
      setIsOnline(false);
      setShow(true);
    } else {
      setIsOnline(true);
    }

    const handleOfflineStatus = () => {
      setIsOnline(false);
      setShow(true);
    };

    // to show the offline message when the user loses connection
    window.addEventListener("offline", handleOfflineStatus);

    let timeout: number;
    const handleOnlineStatus = () => {
      setIsOnline(true);
      setShow(true);
      timeout = window.setTimeout(() => {
        setShow(false);
      }, 1500);
    };

    // to show the online message when the user is back online
    window.addEventListener("online", handleOnlineStatus);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("offline", handleOfflineStatus);
      window.removeEventListener("online", handleOnlineStatus);
    };
  }, []);
  return (
    <div style={{ paddingTop: show ? "24px" : 0 }}>
      {show && (
        <div
          style={{
            top: 0,
            left: 0,
            position: "absolute",
            width: "100%",
            height: "24px",
            zIndex: 999,
            backgroundColor: "red"
          }}
        >
          <p style={{ margin: 0 }}>
            {isOnline ? "You are back online" : "You are offline"}
          </p>
        </div>
      )}
      {userError && <p>{userError}</p>}
      <Router>
        <RouterPage path={ROUTES.BASE} PageComonent={Layout}>
          <RouterPage
            path={ROUTES.BASE}
            PageComonent={LandingPage}
            publicRoute
          />
          <RouterPage
            path={ROUTES.SIGN_UP}
            PageComonent={SignUpPage}
            publicRoute
          />
          <RouterPage
            path={ROUTES.SIGN_UP_EMAIL}
            PageComonent={SignUpEmailPage}
            publicRoute
          />
          <RouterPage
            path={ROUTES.SIGN_IN}
            PageComonent={SignInPage}
            publicRoute
          />
          <RouterPage
            path={ROUTES.SIGN_IN_EMAIL}
            PageComonent={SignInEmailPage}
            publicRoute
          />
          <RouterPage
            path={ROUTES.PASSWORD_FORGET}
            PageComonent={PasswordForgetPage}
          />
          <RouterPage path={ROUTES.APP} PageComonent={ChatPage} privateRoute />
          <RouterPage
            path={ROUTES.ACCOUNT}
            PageComonent={AccountPage}
            privateRoute
          >
            <RouterPage
              path={ROUTES.PROFILE}
              PageComonent={Profile}
              privateRoute
            />
            <RouterPage
              path={ROUTES.PASSWORD_CHANGE}
              PageComonent={PasswordChangeForm}
              privateRoute
            />
            <RouterPage
              path={ROUTES.PASSWORD_FORGET}
              PageComonent={PasswordForgetForm}
              privateRoute
            />
          </RouterPage>
          <RouterPage PageComonent={NotFoundPage} default />
        </RouterPage>
      </Router>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  userError: state.user.error
});

export default connect(mapStateToProps)(App);
