import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";

import Navigation from "./Navigation";
import Wrapper from "../styled/Wrapper";
import Main from "../styled/Main";
import ConnectionMessage from "../styled/ConnectionMessage";

interface LayoutProps {
  children: React.ReactNode;
  userError: string;
}

const Layout = ({ children, userError }: LayoutProps) => {
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
    <Wrapper show={show}>
      {show && (
        <ConnectionMessage isOnline={isOnline}>
          <p style={{ margin: 0 }}>
            {isOnline ? "You are back online" : "You are offline"}
          </p>
        </ConnectionMessage>
      )}
      {userError && <p>{userError}</p>}
      <Navigation />
      <Main>{children}</Main>
    </Wrapper>
  );
};

const mapStateToProps = (state: AppState) => ({
  userError: state.user.error
});

export default connect(mapStateToProps)(Layout);
